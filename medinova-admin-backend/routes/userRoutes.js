import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* ====================================
   🔒 Middleware: Verify Token & Role
==================================== */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Access denied. No token provided." });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains email, role, etc.
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

/* ====================================
   🔹 GET All Users (Admin Only)
==================================== */
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

/* ====================================
   🔹 ADD New User (Admin Only)
==================================== */
router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      gender,
      country,
      dob,
      bloodGroup,
      allergies,
      medications,
      history,
      profilePic,
      role,
    } = req.body;

    // 🔍 Prevent duplicate users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      country,
      dob,
      bloodGroup,
      allergies,
      medications,
      history,
      profilePic,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

/* ====================================
   🔹 UPDATE User by ID
==================================== */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

/* ====================================
   🔹 DELETE User by ID (Role Protected)
==================================== */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Find target user to be deleted
    const targetUser = await User.findById(id);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    // ✅ Identify the requester
    const requesterEmail = req.user.email;
    const requesterRole = req.user.role;

    // 🚫 Prevent deleting Superadmin account
    if (targetUser.email === process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "You cannot delete the Superadmin!" });
    }

    // ✅ If requester is admin (not superadmin)
    if (requesterRole === "admin") {
      if (targetUser.role === "admin") {
        return res.status(403).json({ message: "Admins cannot delete other admins!" });
      }
    }

    // ✅ If requester is user — deny
    if (requesterRole === "user") {
      return res.status(403).json({ message: "You are not authorized to delete anyone!" });
    }

    // ✅ If requester is superadmin — allow all deletions except self
    if (requesterRole === "superadmin" && requesterEmail === targetUser.email) {
      return res.status(403).json({ message: "Superadmin cannot delete their own account!" });
    }

    await targetUser.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
