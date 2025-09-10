import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/generateToken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization || "";
  if (!authorization.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Invalid authorization header shared!!!",
    });
  }
  const token = authorization.split(" ")[1];
  //verify token is valid or not
  const decodedTokenObject = verifyToken(token);
  if (!decodedTokenObject) {
    return res.json({
      message: "Invalid token shared!!!",
    });
  }
  req.userId = decodedTokenObject.id;
  next();
};

export default userAuth;
