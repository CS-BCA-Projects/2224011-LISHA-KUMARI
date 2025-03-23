import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// ✅ Send a contact message
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, reportId, message } = req.body;

    console.log(req.body);

    const newMessage = new Contact({
      senderId,
      receiverId,
      reportId,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Contact message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).json({ error: "Failed to send message" });
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
