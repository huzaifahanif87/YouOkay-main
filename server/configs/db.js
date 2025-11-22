// db.js or db.ts
import mongoose from "mongoose";

const MONGODB_URI = `${process.env.MONGODB_URI}/youokay`;

// Global is used here to maintain a cached connection across hot reloads in development
let cached = (global ).mongoose;

if (!cached) {
  cached = (global).mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: true,
        dbName: "youokay",
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;


