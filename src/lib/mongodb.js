import mongoose from "mongoose";
import "dotenv/config"

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);

    process.exit(1);
  }
}
