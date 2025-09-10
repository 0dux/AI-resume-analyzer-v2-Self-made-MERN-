import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import userAuth from "../middlewares/user.auth";

const UserRouter = express.Router();

UserRouter.post("/signup", registerUser);
UserRouter.post("/signin", loginUser);
// UserRouter.get("/", userAuth, (req, res) => {
//   const userId = req.userId;
//   return res.json({
//     id: userId,
//     message: "Hola mi amigo!!!",
//   });
// });

export default UserRouter;
