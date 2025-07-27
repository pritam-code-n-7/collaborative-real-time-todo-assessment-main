import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io"
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js"
import todoRoutes from "./routes/todo.route.js"
import { dbConnect } from "./config/db.js";
import { setupSocket } from "./socket.js";
dotenv.config();

// express instance
const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors:{
        // origin: process.env.FE_URL
        origin: 'https://todo-collab-peach.vercel.app'
    }
})

// db connection
dbConnect();

// middlewares
// app.use(cors())
app.use(cors({origin:"https://todo-collab-peach.vercel.app", credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use('/api/v1', userRoutes)
app.use('/api/v1', todoRoutes)

// socket setup
setupSocket(io)


// run the server
const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
})