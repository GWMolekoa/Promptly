// Connections to DB
import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  // Check if already connected to avoid redundant connections
  if (isConnected) { 
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, { 
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log('MongoDB connection successful');
  } catch (error) { 
    console.error('MongoDB connection error:', error); 
  }
};
