import mongoose from "mongoose";
import dotnev from 'dotenv'
dotnev.config()
const MONGO_URL = process.env.MONGO_URL
export async function connectDB(){
    try{
      await mongoose.connect(MONGO_URL!)
    }catch(e){
        console.log('Error connecting to DB',e)
    }
}