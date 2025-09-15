const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { format, startOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } = require("date-fns");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
});

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const reportSchema = new mongoose.Schema({
  ageGroup: String,
  symptoms: [String],
  environment: [String],
  symptomDuration: String,
  location: {
    lat: Number,
    lng: Number,
    text: String,
  },
  status: {
    type: String,
    enum: ["new", "under review", "responded"],
    default: "new",
  },
  assignedResponse: {
    type: String,
    default: null,
  },
  timestamp: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);

// Endpoint to create a new report
app.post("/api/report", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();

    io.sockets.sockets.forEach((socket) => {
      try {
        const userLocation = socket.handshake.query.location
          ? JSON.parse(socket.handshake.query.location)
          : null;
        if (
          userLocation &&
          userLocation.lat &&
          userLocation.lng &&
          report.location &&
          report.location.lat &&
          report.location.lng
        ) {
          const latDiff = Math.abs(userLocation.lat - report.location.lat);
          const lngDiff = Math.abs(userLocation.lng - report.location.lng);
          if (latDiff < 0.5 && lngDiff < 0.5) {
            socket.emit("new-report", {
              message: `New report near ${report.location.text || "your area"}`,
              symptoms: report.symptoms,
              location: report.location,
            });
          }
        }
      } catch (error) {}
    });

    res.status(201).json({
      success: true,
      message: "✅ Report saved successfully",
      data: report,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Endpoint to get all reports
app.get("/api/report", async (req, res) => {
  try {
    const reports = await Report.find().sort({ timestamp: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// New endpoint to get dashboard statistics
app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfLastWeek = subDays(today, 7);

    // Total reports today
    const reportsToday = await Report.countDocuments({
      timestamp: { $gte: startOfToday },
    });

    // Total reports this week
    const reportsThisWeek = await Report.countDocuments({
      timestamp: { $gte: startOfLastWeek },
    });

    // Most reported symptom
    const mostReportedSymptom = await Report.aggregate([
      { $unwind: "$symptoms" },
      { $group: { _id: "$symptoms", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    // Active alerts (new reports)
    const activeAlerts = await Report.countDocuments({ status: "new" });

    res.json({
      reportsToday,
      reportsThisWeek,
      mostReportedSymptom: mostReportedSymptom.length > 0 ? mostReportedSymptom[0] : null,
      activeAlerts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// New endpoint for reports by day for the dashboard chart
app.get("/api/dashboard/reports-last-7-days", async (req, res) => {
  try {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(today, i));
    const data = await Promise.all(
      last7Days.map(async (day) => {
        const start = startOfDay(day);
        const end = new Date(day.setHours(23, 59, 59, 999));
        const count = await Report.countDocuments({
          timestamp: { $gte: start, $lte: end },
        });
        return {
          date: format(day, "MMM d"),
          count,
        };
      })
    );
    res.json(data.reverse());
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// NEW: Endpoint for Analytics - Cases by Symptom
app.get("/api/analytics/symptoms", async (req, res) => {
  try {
    const data = await Report.aggregate([
      { $unwind: "$symptoms" },
      { $group: { _id: "$symptoms", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// NEW: Endpoint for Analytics - Reports by Age Group
app.get("/api/analytics/age-groups", async (req, res) => {
  try {
    const data = await Report.aggregate([
      { $group: { _id: "$ageGroup", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// NEW: Endpoint for Analytics - Reports Over Time (Monthly)
app.get("/api/analytics/reports-over-time", async (req, res) => {
  try {
    const data = await Report.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$timestamp" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// NEW: Endpoint for Analytics - Geographic Clusters
app.get("/api/analytics/locations", async (req, res) => {
  try {
    const data = await Report.find({}, { "location.lat": 1, "location.lng": 1, _id: 0 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Endpoint to mark a report as under review
app.patch("/api/report/:id/review", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "under review" },
      { new: true }
    );
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found." });
    }
    res.json(report);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Endpoint to assign a response to a report
app.patch("/api/report/:id/assign", async (req, res) => {
  try {
    const { response } = req.body;
    if (!response) {
      return res.status(400).json({ success: false, message: "Response body is required." });
    }
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "responded", assignedResponse: response },
      { new: true }
    );
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found." });
    }
    res.json(report);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {});
  socket.on("error", (error) => {});
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
