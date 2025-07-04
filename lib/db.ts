import mongoose from "mongoose";
import { cache } from "react";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if(!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    mongoose.connect(MONGODB_URI).then(() => {mongoose.connection});
    try{
        cached.conn =await cached.promise;
    }catch (error) {
        cached.promise = null
        throw error;
    }
    return cached.conn;
}
