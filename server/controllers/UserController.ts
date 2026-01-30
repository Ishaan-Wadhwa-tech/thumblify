import  express  from "express";
import { Request,Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
//all thumbnails for a specific user
export const getUserThumbnails = async(req:Request,res:Response)=>{
try {
    const {userId} = req.session
    const thumbnails = await Thumbnail.find({userId}).sort({createdAt:-1})
    res.json({thumbnails})
} 
catch (error:any) {
    res.status(500).json({message:error.message});
}
}
//a single thumbnail of a specific user
export const getThumbnailsbyId = async(req:Request,res:Response)=>{
try {
    const {userId} = req.session
    const {id} = req.params
    const thumbnail = await Thumbnail.findOne({userId,_id:id})
    res.json({thumbnail})
} 
catch (error:any) {
    res.status(500).json({message:error.message});
}
}
