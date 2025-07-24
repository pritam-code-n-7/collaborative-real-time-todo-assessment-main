import mongoose from "mongoose";

export interface ITodoType{
    title: string
    description?: string
    status: 'pending' | 'in-progress' | 'completed'
    assignedTo?: string,
    createdBy: string
}

const todoSchema = new mongoose.Schema<ITodoType>({
    title:{type: String, required: true},
    description:{type: String},
    status:{type: String, enum:['pending', 'in-progress', 'completed'], default: 'pending'},
    assignedTo:{type: String},
    createdBy:{type: String, required: true},
})

export const Todo = mongoose.models.Todo ?? mongoose.model<ITodoType>('Todo', todoSchema)