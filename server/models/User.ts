import mongoose from "mongoose";

export interface IUser extends Document{
    name:string,
    email:string,
    password?:string,
    createdAt?:Date,
    updatedAt?:Date,
}
const userSchema = new mongoose.Schema({
    name:{type:String,trim:true,required:true},
    email:{type:String,unique:true,trim:true,required:true,lowercase:true},
    password:{type:String,required:true}

},{timestamps:true})
const User = mongoose.models.User || mongoose.model<IUser>('User',userSchema)
export default User