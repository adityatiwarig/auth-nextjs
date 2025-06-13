import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
    console.log("🔍 Raw MONGO_URI from env:", process.env.MONGO_URI);
    if (!process.env.MONGO_URI) {
        console.log("❌ MONGO_URI is undefined. Something is wrong.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.log("❌ Error while connecting MongoDB");
        console.log(error);
    }
}
