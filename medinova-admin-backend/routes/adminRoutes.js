import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Admin dashboard stats
router.get("/dashboard", verifyToken, verifyAdmin, async (req, res) => {
  const totalUsers = await User.countDocuments();
  res.json({
    message: "Welcome to Admin Dashboard",
    totalUsers,
    admin: req.user.email,
  });
});

// Get all users
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
