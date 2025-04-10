import express from "express";
import Contact from "../models/Contact.js";
import mongoose from "mongoose"; // Ensure mongoose is imported

const router = express.Router();

// ✅ Send a contact message
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, reportId, message } = req.body;

    console.log(req.body);

    // Validate required fields
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      return res.status(400).json({ error: "Invalid senderId" });
    }
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid receiverId" });
    }
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message" });
    }

    // Create new message, reportId is optional
    const newMessage = new Contact({
      senderId,
      receiverId,
      reportId, // Will be undefined if not provided, which is fine with required: false
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Contact message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact message:", error.message, error.stack);
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

// ✅ Get all messages for a user
router.get("/messages/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Contact.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate("senderId receiverId reportId");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
