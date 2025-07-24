import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

import { dbConnect } from "./config/db.js";

// express instance
const app = express();

// db connection
dbConnect();

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// get request
app.get("/", (_req:Request, res:Response)=>{
    res.status(200).json({success: true, message:"Hello World!"})
})

// run the server
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
})