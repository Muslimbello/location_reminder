const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema(
 {
  userId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
 },
 { timestamps: true }
);

module.exports = mongoose.model("Reminder", ReminderSchema);
