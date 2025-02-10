require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const geofencesRouter = require("./routes/geofences");
const remindersRouter = require("./routes/reminders");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
 .connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
 .then(() => console.log("MongoDB connected"))
 .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(
 cors({
  origin: process.env.APP_ORIGIN || "*",
 })
);
app.use(bodyParser.json());

// Rate Limiting
const limiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 100,
});
app.use(limiter);

// Routes
app.use("/api/geofences", geofencesRouter);
app.use("/api/reminders", remindersRouter);

// Root endpoint
app.get("/", (req, res) => {
 res.send("Location Reminder Backend with MongoDB is running");
});

// Start server
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
