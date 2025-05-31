import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required!" });
  }

  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Password must be 6 or more characters!",
      status: false,
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "A user with a similar email already exists!",
        status: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(res, newUser._id);

    return res.status(StatusCodes.CREATED).json({
      message: "Account created successfully!",
      user: {
        id: newUser._id,
        name,
        email,
        isVerified: newUser.isVerified,
      },
      token,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, status: false });
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required!" });
  }

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid username or password" });
    }

    const token = generateToken(res, user._id);

    return res.status(StatusCodes.OK).json({
      message: "Login successful!",
      user: {
        id: user._id,
        name,
        email: user.email,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, status: false });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    expires: new Date(0), 
  });

  res.status(200).json({ message: "Logged out successfully!" });
};


export const checkAuth = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "User fetched successfully!",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isVerified: req.user.isVerified,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      status: false,
    });
  }
};
