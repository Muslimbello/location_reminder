/* cspell: disable-next-line */
const express = require("express");
const router = express.Router();
const { Geofence } = require("../models");

// Create a new geofence
router.post("/", async (req, res) => {
 try {
  const { userId, latitude, longitude, radius } = req.body;
  if (!userId || latitude === undefined || longitude === undefined || !radius) {
   return res
    .status(400)
    .json({ success: false, error: "Missing required fields" });
  }
  const geofence = new Geofence({ userId, latitude, longitude, radius });
  await geofence.save();
  res.status(201).json({ success: true, geofence });
 } catch (error) {
  res.status(500).json({ success: false, error: error.message });
 }
});

// Get all geofences for a user
router.get("/:userId", async (req, res) => {
 try {
  const { userId } = req.params;
  const geofences = await Geofence.find({ userId });
  res.json({ success: true, geofences });
 } catch (error) {
  res.status(500).json({ success: false, error: error.message });
 }
});

// Delete a geofence by ID
router.delete("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const result = await Geofence.findByIdAndDelete(id);
  if (!result) {
   return res
    .status(404)
    .json({ success: false, message: "Geofence not found" });
  }
  res.json({ success: true, message: "Geofence removed" });
 } catch (error) {
  res.status(500).json({ success: false, error: error.message });
 }
});

module.exports = router;
