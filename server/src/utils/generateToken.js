import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 3600000, // 1 hour
      });

    return token;
}
