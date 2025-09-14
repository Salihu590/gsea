const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

const reportSchema = new mongoose.Schema({
  symptoms: [String],
  environment: [String],
  age: Number,
  location: {
    lat: Number,
    lng: Number,
    manual: String,
  },
  timestamp: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);

app.post("/api/report", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res
      .status(201)
      .json({ success: true, message: "Report saved", data: report });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
