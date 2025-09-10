import { Request, Response } from "express";
import { loginUserSchema, registerUserSchema } from "../common/input.types";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const result = registerUserSchema.safeParse(newUser);

    //check if the inputs sent are correct
    if (!result.success) {
      return res.status(400).json({
        message: "Incorrect inputs passed during the user's registration.",
      });
    }

    const userAlreadyExists = await User.findOne({
      email: result.data?.email,
    });
    //check if email is already under use
    if (userAlreadyExists) {
      return res.status(409).json({
        message:
          "This email is already under use by an existsing user, try logging into your account.",
      });
    }

    //hash the password for safety...
    const { fullName, email, password } = newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    //create a new user
    const createdUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.json({
      message: "User created succesfully!!!",
      token: generateToken(createdUser._id.toString()),
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const loginInputs = req.body;
    const result = loginUserSchema.safeParse(loginInputs);

    //perform input validation
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid inputs entered!!!",
      });
    }

    const { email, password } = loginInputs;
    const userExists = await User.findOne({
      email,
    });

    //check if the user exists
    if (!userExists) {
      return res.status(404).json({
        message: "User doesn't exists!!!",
      });
    }

    const passwordsMatch = await bcrypt.compare(password, userExists.password);
    //check if the passwords match or not
    if (!passwordsMatch) {
      return res.status(401).json({
        message: "Incorrect password entered!!!",
      });
    }

    return res.json({
      message: "Logged In successfully!!!",
      token: generateToken(userExists._id.toString()),
    });
  } catch (error) {
    console.log("Some error has occured!!!  :::" + error);
  }
};
