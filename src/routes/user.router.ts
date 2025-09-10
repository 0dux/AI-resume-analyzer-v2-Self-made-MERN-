import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.post("/signup", registerUser);
UserRouter.post("/signin", loginUser);

export default UserRouter;
