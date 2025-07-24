import express from "express";
import cors from "cors";

import { dbConnect } from "./config/db.js";
import userRoutes from "./routes/user.route.js"

// express instance
const app = express();

// db connection
dbConnect();

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use('/api/v1', userRoutes)


// run the server
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
})