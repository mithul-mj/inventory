import mongoose from "mongoose";
import "dotenv/config";

export class Database {
  async connect(): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB connected");
  }
}
