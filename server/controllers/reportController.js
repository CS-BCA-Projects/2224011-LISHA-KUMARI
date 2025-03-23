// // controllers/reportController.js
// export const reportItem = async (req, res) => {
// try {
// const { type, itemName, location, description, contact, time } = req.body;

// // Simulating saving data to the database
// // Here, you would typically save the data to MongoDB or another database

// console.log('Received Report:', { type, itemName, location, description, contact, time });

// // Respond with success
// res.status(200).json({ message: 'Report submitted successfully!' });
// } catch (error) {
// console.error('Error:', error);
// res.status(500).json({ message: 'Internal Server Error' });
// }
// };

// controllers/reportController.js
import Report from "../models/Report.js";


// create a report
export const reportItem = async (req, res) => {
	try {
		const { type, itemName, location, description, time , userId} = req.body;
		
		const formattedTime = new Date(time)

		if (!userId){
			return res.status(400).json({
				success : false , message : 'UserId not defined'
			})
		}
		const newReport = new Report({ type, itemName, location, description, time : formattedTime , reportedBy :  userId , belongsTo : userId });
		await newReport.save();

		res.status(201).json({ success : true ,  message: "Report submitted successfully!"});

	} catch (error) {
		console.error("Error reporting item:", error);
		res.status(500).json({ success : false, error: "Failed to report item" });
	}
}; 

// think something about ki multiple reports na bnee same item ki, ya aise bhi thik rhegaa, jaisi marzii


// reported items by user

export const getItemsReportedByUsers = async(req , res) => {

	const {userId} = req.body

	if (!userId){
		return res.status(400).json({
			success : false,
			message : 'UserId not defined'
		})
	}

	try {

		const allItems = await Report
							.find({reportedBy : userId} )
							.populate('reportedBy' , 'name')
							.exec()
							|| [] // query change for jiska vo item h

		if (allItems.length === 0){
			return res.status(404).json({
				success : false,
				message : 'No items found'
			})
		}else{
			return res.status(200).json({
				success : true,
				allItems
			})
		}

		} catch (error) {
			console.log(error);
			return res.status(500).json({
			success : false,
			message : 'some error occurred'
			})
		}

}


// Matching reports: Lost vs Found --- will be done later with ml libraries
export const getMatches = async (req, res) => {
	try {
		const lostItems = await Report.find({ type: "lost" });
		const foundItems = await Report.find({ type: "found" });

		const matches = [];

		lostItems.forEach((lostItem) => {
			foundItems.forEach((foundItem) => {
				if (
					lostItem.description === foundItem.description &&
					lostItem.location === foundItem.location &&
					Math.abs(new Date(lostItem.time) - new Date(foundItem.time)) <= 48 * 60 * 60 * 1000 // Within 48 hours
				) {
					matches.push({ lostItem, foundItem });
				}
			});
		});

		res.status(200).json(matches);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch matches" });
	}
};


