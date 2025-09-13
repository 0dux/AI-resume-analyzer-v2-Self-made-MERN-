import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import userAuth from "../middlewares/user.auth";
import { streamUpload } from "../utils/helper";
import { User } from "../models/user.model";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.memoryStorage();
const upload = multer({ storage });

const resumeRouter = express.Router();

resumeRouter.post(
  "/upload",
  userAuth,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const userId = req.userId;
      const uploadedFile = await streamUpload(req.file.buffer);
      const foundUser = await User.findById(userId);

      if (!foundUser) {
        return res.status(404).json({
          message:
            "Cannot upload the user doesn't exist or incorrect headers passed.",
        });
      }
      if (foundUser.resumes.length >= 4) {
        return res.status(400).json({
          message: "You cam only upload 4 resumes per user!!!",
        });
      }

      await foundUser.resumes.push({ pdfUrl: uploadedFile.url });

      await foundUser.save();
      const latestResume = foundUser.resumes[foundUser.resumes.length - 1];

      res.json({
        message: "Resume added succesfully!!!",
        resumeUrl: latestResume.pdfUrl,
        resumeId: latestResume._id,
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: err.message });
    }
  }
);

export default resumeRouter;
