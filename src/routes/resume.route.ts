import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import userAuth from "../middlewares/user.auth";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const resumeRouter = express.Router();

// helper to stream buffer to cloudinary
const streamUpload = (buffer: Buffer) =>
  new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // auto = pdf/images/videos all handled
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });

resumeRouter.post(
  "/upload",
  userAuth,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const result = await streamUpload(req.file.buffer);

      return res.json({
        fname: req.body,
        message: "Upload success",
        url: result.secure_url,
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: err.message });
    }
  }
);

export default resumeRouter;
