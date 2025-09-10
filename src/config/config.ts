import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (MONGO_DB_URI: string) => {
  try {
    mongoose.connect(MONGO_DB_URI);
    console.log("✅✅ Database connected succesfully!!!");
  } catch (error) {
    console.log(
      "❌❌ Some error occured during database connection ::" + error
    );
  }
};

export default connectDB;
