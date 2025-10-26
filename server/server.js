const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const {
  format,
  startOfDay,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} = require("date-fns");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);
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

app.get("/api/report", async (req, res) => {
  try {
    const reports = await Report.find().sort({ timestamp: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfLastWeek = subDays(today, 7);

    const reportsToday = await Report.countDocuments({
      timestamp: { $gte: startOfToday },
    });

    const reportsThisWeek = await Report.countDocuments({
      timestamp: { $gte: startOfLastWeek },
    });

    const mostReportedSymptom = await Report.aggregate([
      { $unwind: "$symptoms" },
      { $group: { _id: "$symptoms", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const activeAlerts = await Report.countDocuments({ status: "new" });

    res.json({
      reportsToday,
      reportsThisWeek,
      mostReportedSymptom:
        mostReportedSymptom.length > 0 ? mostReportedSymptom[0] : null,
      activeAlerts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

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

app.get("/api/analytics/reports-over-time", async (req, res) => {
  try {
    const data = await Report.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%dT%H:%M", date: "$timestamp" },
          },
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

app.get("/api/analytics/locations", async (req, res) => {
  try {
    const data = await Report.find(
      {},
      { "location.lat": 1, "location.lng": 1, _id: 0 }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.patch("/api/report/:id/review", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "under review" },
      { new: true }
    );
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found." });
    }
    res.json(report);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


app.patch("/api/report/:id/assign", async (req, res) => {
  try {
    const { response } = req.body;
    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: "Response body is required." });
    }
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "responded", assignedResponse: response },
      { new: true }
    );
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found." });
    }
    res.json(report);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


app.get("/api/ai/predict-outbreak", async (req, res) => {
  try {
    const NOW = new Date();
 
    const ONE_DAY_AGO = new Date(NOW.getTime() - 24 * 60 * 60 * 1000); 

    // 1. Fetch recent reports (last 24 hours)
    const recentReports = await Report.find({
      timestamp: { $gte: ONE_DAY_AGO, $lte: NOW },
    }).lean();

    // 2. Check for the minimum number of data points (5 reports)
    if (recentReports.length < 5) {
      return res.status(200).json({
        success: true,
        message: "Not enough recent data to predict. Need at least 5 reports from the last 24 hours.",
        predictions: [],
      });
    }

    // 3. Find clusters based on location and symptom similarity
    const clusters = {};
    recentReports.forEach((report) => {
      // Create a key by rounding coordinates to cluster nearby reports
      const locationKey = `${Math.round(report.location.lat * 100) / 100}-${
        Math.round(report.location.lng * 100) / 100
      }`;
      if (!clusters[locationKey]) {
        clusters[locationKey] = {
          count: 0,
          lat: 0,
          lng: 0,
          symptoms: new Set(),
        };
      }
      clusters[locationKey].count++;
      clusters[locationKey].lat += report.location.lat;
      clusters[locationKey].lng += report.location.lng;
      report.symptoms.forEach((symptom) =>
        clusters[locationKey].symptoms.add(symptom)
      );
    });

    // 4. Identify the highest-risk clusters by sorting
    const sortedClusters = Object.keys(clusters)
      .map(key => {
        const cluster = clusters[key];
        const score = cluster.count + cluster.symptoms.size;
        return {
          ...cluster,
          score,
          avgLat: cluster.lat / cluster.count,
          avgLng: cluster.lng / cluster.count
        };
      })
      .sort((a, b) => b.score - a.score);

    // Get the top 3 clusters, as a balance between too many and too few predictions
    const topClusters = sortedClusters.slice(0, 3);

    if (topClusters.length === 0 || topClusters[0].score < 5) {
      return res.status(200).json({
        success: true,
        message: "No significant clusters detected in the recent data.",
        predictions: [],
      });
    }

    // 5. Predict the next locations based on the top clusters
    const predictions = topClusters.map(cluster => {
      // Simple random offset for prediction, simulating a spread
      const nextPredictedLat = cluster.avgLat + (Math.random() - 0.5) * 0.05;
      const nextPredictedLng = cluster.avgLng + (Math.random() - 0.5) * 0.05;
      return { lat: nextPredictedLat, lng: nextPredictedLng };
    });

    res.status(200).json({
      success: true,
      message: "Multiple outbreak trends detected!",
      predictions,
    });
  } catch (err) {
    console.error("Outbreak prediction failed:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});


io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {});
  socket.on("error", (error) => {});
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
