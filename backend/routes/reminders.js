const express = require("express");
const router = express.Router();
const { Reminder } = require("../models");

// Log a reminder event
router.post("/", async (req, res) => {
 try {
  const { userId, message, timestamp } = req.body;
  if (!userId || !message || !timestamp) {
   return res
    .status(400)
    .json({ success: false, error: "Missing required fields" });
  }
  const reminder = new Reminder({ userId, message, timestamp });
  await reminder.save();
  res.status(201).json({ success: true, reminder });
 } catch (error) {
  res.status(500).json({ success: false, error: error.message });
 }
});

// Get reminders for a user
router.get("/:userId", async (req, res) => {
 try {
  const { userId } = req.params;
  const reminders = await Reminder.find({ userId });
  res.json({ success: true, reminders });
 } catch (error) {
  res.status(500).json({ success: false, error: error.message });
 }
});

// Delete a reminder by ID
router.delete("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const result = await Reminder.findByIdAndDelete(id);
  if (!result) {
   return res
    .status(404)
    .json({ success: false, message: "Reminder not found" });
  }
  res.json({ success: true, message: "Reminder removed" });
 } catch (error) {
  res.status(500).json({ success: false, error: error.message });
 }
});

module.exports = router;
