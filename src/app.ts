import express, { Express } from "express";
import UserRouter from "./routes/user.router";
import resumeRouter from "./routes/resume.route";

const app: Express = express();

//required dependencies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/resume", resumeRouter);

export default app;
