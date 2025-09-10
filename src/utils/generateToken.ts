import jwt from "jsonwebtoken";

const generateToken = (val: string) => {
  const token = jwt.sign({ id: val }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
};

export default generateToken;
