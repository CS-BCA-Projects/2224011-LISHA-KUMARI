import userModel from "../models/userModel.js";

export const getUserData = async(req, res)=>{
    try{
        const {userId}= req.body;

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success: false, message: 'User not found'})
        }

        res.json({
            success:true,
            UserData:{
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch(error){
        res.json({success:false, message: error.message})
    }
}

export const getAllUsers = async(req , res) => {
    try {
        
        const allUsers = await userModel
                                .find({})
                                .select('name email')

        if(!allUsers.length > 0){
            return res.status(404).json({success : false , message: 'No users found'})
        }

        return res.status(200).json({success : true , users: allUsers})

    } catch (error) {
        res.json({success: false , message: error.message})
    }
}