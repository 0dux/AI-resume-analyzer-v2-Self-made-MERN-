import express from "express";
import userAuth from "../middlewares/user.auth";

const resumeRouter = express.Router();

resumeRouter.post("/upload", userAuth, async (req, res) => {});

export default resumeRouter;
