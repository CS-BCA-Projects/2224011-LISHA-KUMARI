import express from "express";
import Report from "../models/Report.js";
import Notification from "../models/Notification.js";
import userModel from "../models/userModel.js";
import protectAdmin from "../middleware/authMiddleware.js"; // Updated import
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// Get admin summary
router.get("/summary", protectAdmin, async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments({ isAdmin: false });
    const totalReports = await Report.countDocuments();
    const matchedReports = await Report.countDocuments({ isMatched: true });
    res.json({ success: true, totalUsers, totalReports, matchedReports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Manual matching by admin
router.post("/match", protectAdmin, async (req, res) => {
  const { lostId, foundId } = req.body;
  try {
    const lostItem = await Report.findById(lostId).populate("reportedBy", "name email");
    const foundItem = await Report.findById(foundId).populate("reportedBy", "name email");

    if (!lostItem || !foundItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    lostItem.isMatched = true;
    lostItem.matchedWith = foundId;
    foundItem.isMatched = true;
    foundItem.matchedWith = lostId;

    await lostItem.save();
    await foundItem.save();

    await Notification.create({
      userId: lostItem.reportedBy._id,
      message: `Your lost item "${lostItem.itemName}" has been matched with a found item.`,
      contactInfo: foundItem.reportedBy.email,
    });
    await Notification.create({
      userId: foundItem.reportedBy._id,
      message: `Your found item "${foundItem.itemName}" has been matched with a lost item.`,
      contactInfo: lostItem.reportedBy.email,
    });

    res.status(200).json({ success: true, message: "Items matched and users notified" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Notify users after match (optional)
router.post("/notify-match", protectAdmin, async (req, res) => {
  const { lostId, foundId } = req.body;
  try {
    const lostItem = await Report.findById(lostId).populate("reportedBy", "name email");
    const foundItem = await Report.findById(foundId).populate("reportedBy", "name email");

    if (!lostItem || !foundItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    await Notification.create({
      userId: lostItem.reportedBy._id,
      message: `Your lost item "${lostItem.itemName}" has been matched.`,
      contactInfo: foundItem.reportedBy.email,
    });
    await Notification.create({
      userId: foundItem.reportedBy._id,
      message: `Your found item "${foundItem.itemName}" has been matched.`,
      contactInfo: lostItem.reportedBy.email,
    });

    res.status(200).json({ success: true, message: "Users notified" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user (admin only)
router.delete("/users/:id", protectAdmin, async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Deletion error:", error); // Log for debugging
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;