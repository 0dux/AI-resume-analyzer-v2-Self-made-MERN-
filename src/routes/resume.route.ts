import express from "express";
import multer from "multer";
import path from "path";
import userAuth from "../middlewares/user.auth";

const storage = multer.diskStorage({
  //storage engine is responsible for storing the files sent via multer
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "src", "uploads"));
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();
    cb(null, `${suffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});
const resumeRouter = express.Router();

resumeRouter.post(
  "/upload",
  userAuth,
  upload.single("resume"),
  async (req, res) => {
    const userId = req.userId;
    const { fname, lname } = req.body;
    const resume = req.file;

    res.json({
      userId,
      fname,
      lname,
      message: "file stored succesfully!!!",
      resume,
    });
  }
);

export default resumeRouter;
