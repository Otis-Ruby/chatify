import User from "../models/user.model.js";
import Message from "../models/message.model.js"
export const getUserForSideBar =async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers =await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }catch(error){
        console.log("Error in getUserForSideBar",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }

};

export const getMesages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        
        const messages =await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId},
            ]
        })
        res.status(200).json(messages);
    }catch(error){
        console.log("Error in getMessages contoller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const sendMessage =async(req,res)=>{
     try{
        const {text,image}=req.body;
        const{id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if (image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Messsage({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();
        // todo realtime functionality


        res.status(201).json(newMesssage);
     }catch(error){
        console.log("error in send Message contoller: ",error.message);
        res.status(500).json({error:"Internal server error"});
     }
}