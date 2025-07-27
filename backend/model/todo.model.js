import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{type: String, required: true},
    description:{type: String},
    status:{type: String, enum:['pending', 'in-progress', 'completed'], default: 'pending'},
    assignedTo:{type: String},
    createdBy:{type: String, required: true},
})

export const Todo = mongoose.models.Todo ?? mongoose.model('Todo', todoSchema)