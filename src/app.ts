import express, { Express, urlencoded } from "express";
import UserRouter from "./routes/userRouter";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", UserRouter);

export default app;
