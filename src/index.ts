import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/config";

dotenv.config();

connectDB(process.env.MONGO_DB_URI || "null");
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
