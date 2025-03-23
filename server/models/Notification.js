import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    message: { type: String, required: true },
    contactInfo: { type: String, required: true },
    read: { type: Boolean, default: false },
});


const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
