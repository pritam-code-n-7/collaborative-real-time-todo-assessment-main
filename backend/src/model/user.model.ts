import mongoose from "mongoose";

export interface IUserType{
    name: string
    email: string
    password: string
}

const userScheme = new mongoose.Schema<IUserType>({
    name:{type: String, required: true},
    email:{type: String, index: true, unique: true, trim: true, required: true},
    password:{type: String, trim: true, min:8, required: true},
},{timestamps: true})

export const User = mongoose.models.User ?? mongoose.model<IUserType>('User', userScheme);