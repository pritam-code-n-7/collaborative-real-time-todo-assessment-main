import express from "express";
import { Todo } from "../model/todo.model.js";

const router = express.Router();

router.post('/todo', async(req, res)=>{
    try {
        const {title, description, status, assignedTo, createdBy} = req.body;

        if(!title || !createdBy){
            res.status(400).json({success: false, message: "Title and Created By are required."})
        }

        const data = await Todo.create({title, description, status, assignedTo, createdBy})

        console.log(data);
        res.status(201).json({success: true, message: "Todo created successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.get('/todo', async(_req, res)=>{
    try {
        const data = await Todo.find();
        console.log(data);
        res.status(200).json(data)
        
    } catch (error) {
       console.error(error);
    res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.get('/todo/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await Todo.findById(id);
        console.log(data);
        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.put('/todo/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const todoDetails = req.body;

        const data = await Todo.findByIdAndUpdate(id, todoDetails, {new: true});
        console.log(data);

        res.status(200).json({success: true, message: "Todo details updated successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})

router.delete('/todo/:id', async(req, res)=>{
    try {
        const {id} = req.params;

        const data = await Todo.findByIdAndDelete(id);
        console.log(data);
        
        res.status(204).end()
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
})

export default router;