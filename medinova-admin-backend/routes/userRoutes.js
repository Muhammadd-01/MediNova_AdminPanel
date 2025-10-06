import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* =========================
   🔹 GET All Users
========================= */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

/* =========================
   🔹 ADD New User (Admin Only)
========================= */
router.post("/", async (req, res) => {
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
      role, // ✅ new field
    } = req.body;

    // Optional: prevent duplicate users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new User({
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
      role: role || "user", // default if not provided
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

/* =========================
   🔹 UPDATE User by ID
========================= */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

/* =========================
   🔹 DELETE User by ID
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

export default router;
