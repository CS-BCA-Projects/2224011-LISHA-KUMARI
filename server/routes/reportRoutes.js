import express from "express";
import Report from "../models/Report.js";
import Notification from "../models/Notification.js";
import userAuth from "../middleware/userAuth.js";
import { reportItem, getItemsReportedByUsers } from "../controllers/reportController.js";

const router = express.Router();

// Create a report
router.post("/create-item", userAuth, reportItem);

// Get all reported items (for admin or browse)
router.get("/all-item-reports", userAuth, async (req, res) => {
  try {
    const items = await Report.find().populate("reportedBy", "name email");
    res.status(200).json({ success: true, allItems: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's reported items (for user dashboard)
router.get("/user-items", userAuth, getItemsReportedByUsers);

// Get lost items (for admin matching)
router.get("/lost", userAuth, async (req, res) => {
  try {
    const lostItems = await Report.find({ type: "lost", isMatched: false }).populate(
      "reportedBy",
      "name email"
    );
    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get found items (for admin matching)
router.get("/found", userAuth, async (req, res) => {
  try {
    const foundItems = await Report.find({ type: "found", isMatched: false }).populate(
      "reportedBy",
      "name email"
    );
    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's matched items (for user dashboard)
router.get("/matched-items", userAuth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const matchedItems = await Report.find({
      $or: [{ reportedBy: userId }, { belongsTo: userId }],
      isMatched: true,
    })
      .populate("matchedWith")
      .populate("reportedBy", "name email");
    res.status(200).json({ success: true, matched: matchedItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Claim an item
router.put("/claim-item/:id", userAuth, async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "claimed" },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({ success: true, report: updatedReport });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a reported item
router.delete("/delete-item/:id", userAuth, async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    console.error("Deletion error:", error); // Log for debugging
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a reported item
router.put("/update-item/:id", userAuth, async (req, res) => {
  const { itemName, location, description, contact, status } = req.body;
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { itemName, location, description, contact, status },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({ success: true, report: updatedReport });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;