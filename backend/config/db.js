import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;


export const dbConnect = async()=>{
    try {
        await mongoose.connect(mongoUri, {dbName: dbName})
        console.log('mongodb connected!');
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}