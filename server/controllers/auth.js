import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import { Vonage } from "@vonage/server-sdk";
import dotenv from "dotenv";
// import User from 

dotenv.config();

import User from "../models/User.js";

const router = express.Router();

// const vonage = new Vonage({
//     apiKey: "process.env.YOUR_API_KEY",
//     apiSecret: "process.env.YOUR_API_SECRET"
// })

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, phone, password } = req.body;

  try {
    // Check if user with email or phone already exists
    // let user = await User.findOne({ $or: [{ phone }] });
    // if (user) {
    //   return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    // }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save user to database
    const result = await User.create({ name, phone, password: hashedPassword });
    // await user.save();
    const payload = { phone:result.phone, id:result._id };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.status(200).json({user:result,token:token});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// export const verify = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { phone, code } = req.body;

//   try {
//     // Find user by phone and verification code
//     let user = await User.findOne({ phone, verificationCode: code });
//     if (!user) {
//       return res.status(400).json({ errors: [{ msg: 'Invalid verification code' }] });
//     }

//     // Update user to verified status
//     user.verified = true;
//     user.verificationCode = null;
//     await user.save();
//     res.status(201).json({ Success: [{ msg: 'Successfully verified' }] });
//     }
//    catch (err) {
//         console.error(err.message);
//         res.status(500).json({ errors: [{ msg: 'Server error' }] });
//     }
// };

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone: phone });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({user:user,token:token});;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const forget_password = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { phone } = req.body;

//   try {
//     // Check if user exists
//     let user = await User.findOne({ phone });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ errors: [{ msg: "Phone number not found" }] });
//     }

//     // Generate JWT token for password reset
//     const payload = { user: { id: user.id } };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     // Send SMS with password reset link
//     const from = process.env.fromAPI;
//     const to = `+${user.phone}`;
//     const text = `Click this link to reset your password: http://localhost:3000/reset-password/${token}`;
//     async function sendSMS() {
//       await vonage.sms
//         .send({ to, from, text })
//         .then((resp) => {
//           console.log("Message sent successfully");
//           console.log(resp);
//         })
//         .catch((err) => {
//           console.log("There was an error sending the messages.");
//           console.error(err);
//         });
//     }
//     sendSMS();

//     res.json({ msg: "Password reset link sent" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ errors: [{ msg: "Server error" }] });
//   }
// };

// export const reset_password = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { password } = req.body;
//   const token = req.params.token;

//   try {
//     // Verify token

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.user.id;

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Update user's password
//     let user = await User.findByIdAndUpdate(
//       userId,
//       { password: hashedPassword },
//       { new: true }
//     );
//     if (!user) {
//       return res.status(400).json({ errors: [{ msg: "Invalid token" }] });
//     }

//     res.json({ msg: "Password updated" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ errors: [{ msg: "Server error" }] });
//   }
// };

export const logout = (req, res) => {
  // Destroy the user's session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Error logging out" });
    } else {
      // Clear the JWT token from the client's cookies
      res.clearCookie("jwt");
      res.status(200).json({ message: "Logged out successfully" });
    }
  });
};
