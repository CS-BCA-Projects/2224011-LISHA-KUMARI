// routes/reportRoutes.js
import express from "express";
import Report from "../models/Report.js";
import { reportItem, getItemsReportedByUsers } from "../controllers/reportController.js";
import Notification from "../models/Notification.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();


// route to create a report for an item
router.post('/create-item', userAuth , reportItem);


// Route to get all reported items
router.get('/all-item-reports' , userAuth , getItemsReportedByUsers);


// Route to claim an item
router.put('/claim-item/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const updatedReport = await Report.findByIdAndUpdate(
          id,
          { status: "claimed" },
          { new: true }
      );
      res.status(200).json(updatedReport);
  } catch (error) {
      res.status(500).json({ error: "Failed to claim the report" });
  }
});


// Route to delete a reported item
router.delete('/delete-item/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const deletedReport = await Report.findByIdAndDelete(id);
      res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Failed to delete the report" });
  }
});


// Route to update a reported item (optional, for updating details)
router.put('/update-item/:id', async (req, res) => {
  const { id } = req.params;
  const { itemName, location, description, contact, status } = req.body;
  try {
    const updatedReport = await Report.findByIdAndUpdate(id, {
      itemName,
      location,
      description,
      contact,
      status,
    }, { new: true });
    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the report" });
  }
});


// Matching Functionality & Sending Notifications
router.get('/match-items', async (req, res) => {
  try {
      const lostItems = await Report.find({ type: "lost" });
      const foundItems = await Report.find({ type: "found" });

      let matches = [];

      lostItems.forEach(lost => {
          foundItems.forEach(found => {
              if (
                  lost.itemName.toLowerCase() === found.itemName.toLowerCase() &&
                  lost.location.toLowerCase() === found.location.toLowerCase()
              ) {
                  matches.push({ lost, found });

                  // Save notification
                  const newNotification = new Notification({
                      userId: lost._id, // Assuming user ID is stored in the report
                      message: `Your lost item "${lost.itemName}" has a match.`,
                      contactInfo: found.contact,
                  });
                  newNotification.save();
              }
          });
      });

      res.status(200).json(matches);
  } catch (error) {
      res.status(500).json({ error: "Error finding matches" });
  }
});


// Fetch Notifications for a User
router.get('/notifications/:userId', async (req, res) => {
  try {
      const notifications = await Notification.find({ userId: req.params.userId });
      res.status(200).json(notifications);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
  }
});


export default router;
