import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if(!mongoUri || !dbName){
    throw new Error('missing mongouri and dbname.')
}

export const dbConnect = async()=>{
    try {
        await mongoose.connect(mongoUri, {dbName: dbName})
        console.log('mongodb connected!');
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}