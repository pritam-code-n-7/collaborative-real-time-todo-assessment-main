import mongoose from "mongoose";

export interface IUserType{
    name: string
    email: string
    password: string
    avatar: string
    color: string
}

const userScheme = new mongoose.Schema<IUserType>({
    name:{type: String, required: true},
    email:{type: String, index: true, unique: true, trim: true, required: true},
    password:{type: String, trim: true, min:6, required: true},
    avatar:{type: String, trim: true, default: "👤"},
    color:{type: String, trim: true, default: "bg-blue-500"},
},{timestamps: true})
 
export const User = mongoose.models.User ?? mongoose.model<IUserType>('User', userScheme);