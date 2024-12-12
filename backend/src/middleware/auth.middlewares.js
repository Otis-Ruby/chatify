import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cookieParser from "cookie-parser"

export const protectRoute =async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;

        if (!token){
            return res.status(401).json({message:"Unauthorized -No Token Provider"});
        }

    const decoded =jwt.verify(token,process.env.JWT_SECRET);

    if (!decoded){
        return res.status(401).json({message:"Unauthorized -Invalid Token"});
    }
    const user =await User.findById(decoded.userId).select("-password");

    if (!user){
        return res.status(404).json({message:"User not Found"});
    }
    
    req.user =user
    next()

    }catch(error){
        console.log("Error in Protect middleware: ",error.message);
        res.status(500).json({message:"Internal Server Error"});

    }
}

export const checkAuth=(req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in CheckAuth contoller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}