import express from "express";
import { loginUser, registerUser } from "../controllers/userController";

const UserRouter = express.Router();

UserRouter.post("/signup", registerUser);
UserRouter.post("/signin", loginUser);

export default UserRouter;
