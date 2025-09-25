import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if(!MONGO_URI) throw new Error("MONGO_URI not defined");

let cached = (global as any).mogoose;

if (!cached) {
    cached = (global as any).mongoose = {conn: null, promise: null};
}

async function connectDB (){
    if(cached.conn) return cached.conn;
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose)=> mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;