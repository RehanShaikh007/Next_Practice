import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) throw new Error("MONGO_URI not defined");

// Define a type for cache
type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// Extend global type to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Use existing cache or initialize
const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  return cached.conn;
}

export default connectDB;
