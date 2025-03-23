import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// Create a new notification
router.post('/create', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const newNotification = new Notification({ userId, message });
    await newNotification.save();
    res.status(201).json({ success: true, message: 'Notification created!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get notifications for a user
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Example: Create a notification when a report is claimed
router.put('/claim/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId; // Sender ID or user triggering the claim
  
  try {
    const updatedReport = await Report.findByIdAndUpdate(id, { status: 'claimed' }, { new: true });
    const newNotification = new Notification({
      userId,
      message: `Your report for the item ${updatedReport.itemName} has been claimed!`
    });
    await newNotification.save();
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to claim the report' });
  }
});

export default router;
