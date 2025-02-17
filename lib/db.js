import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("MongoDB is already connected.");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
};
