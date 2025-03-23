// models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
	itemName: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	reportedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
	time:{
		type: Date,
		required: true
	},
	type: {
		type: String,
		required: true,
		enum: ["lost", "found"],
	},
	status: {
		type: String,
		enum: ["unclaimed", "claimed"],
		default: "unclaimed",
	},
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
