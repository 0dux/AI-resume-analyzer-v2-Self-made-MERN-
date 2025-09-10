import jwt, { JwtPayload } from "jsonwebtoken";

interface myJwtPayload extends JwtPayload {
  id: string; //basically need to extend the type of jwt and declare id there so that you can
} //use decoded.id after passing cause normal jwtpayload type doesn't have a id property.

const generateToken = (val: string) => {
  try {
    const token = jwt.sign({ id: val }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    console.log("Some error has occured while token creation ::" + error);
  }
};

export default generateToken;

export const verifyToken = (token: string): myJwtPayload | null => {
  //JWT verify returns payload on success and on failure throws an error
  try {
    //jwt verify is synchronous when not cb fn is given.
    if (!process.env.JWT_SECRET) {
      throw new Error("No jwt secret passed");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as myJwtPayload;
    return decoded;
  } catch (error) {
    console.log(
      "Some error has occured during jwt verification process ::" + error
    );
    return null;
  }
};
