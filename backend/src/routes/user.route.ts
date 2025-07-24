import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { User } from "../model/user.model.js";

const router = express.Router();

router.post('/user/auth/signup', async(req, res)=>{
    try {
        const {name, email, password} = req.body;

        const user = await User.findOne({ email });
        if(user){
            res.status(409).json({success: false, message: "User already exists, you can login."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userModel = new User({name, email, password: hashedPassword})
        const data = await userModel.save();

        console.log(data);
        res.status(201).json({success: true, message: "User created successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.post('/user/auth/login', async(req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user){
            res.status(404).json({success: false, message: "No user found with this email."})
        }

        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword){
            res.status(403).json({success: false, message: "Invalid credentials."})
        }

        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id, name: user.name},
            process.env.JWT_SECRET as string,
            {expiresIn: '10d'}
        )
        console.log(jwtToken);
        
        res.status(200).json({
            success: true,
            message: "Logged-In successfully.",
            jwtToken,
            _id: user._id,
            name: user.name,
            email: user.email
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.get('/user', async(_req, res)=>{
    try {
        const data = await User.find();
        console.log(data);
        res.status(200).json(data)
        
    } catch (error) {
       console.error(error);
    res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.get('/user/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await User.findById(id);
        console.log(data);
        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.put('/user/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const userDetails = req.body;

        const data = await User.findByIdAndUpdate(id, userDetails, {new: true});
        console.log(data);

        res.status(200).json({success: true, message: "User details updated successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.delete('/user/:id', async(req, res)=>{
    try {
        const {id} = req.params;

        const data = await User.findByIdAndDelete(id);
        console.log(data);
        
        res.status(204).end()
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})


export default router;