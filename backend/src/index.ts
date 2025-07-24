import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io"

import { dbConnect } from "./config/db.js";
import userRoutes from "./routes/user.route.js"
import todoRoutes from "./routes/todo.route.js"
import { setupSocket } from "./socket.js";

// express instance
const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors:{
        origin: process.env.FE_URL
    }
})

// db connection
dbConnect();

// middlewares
app.use(cors())
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