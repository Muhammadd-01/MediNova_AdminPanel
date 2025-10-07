import express from "express";
import bcrypt from "bcryptjs";
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
      password: hashedPassword, // store hashed password
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
    const updateData = { ...req.body };

    // ✅ If password is being updated, hash it again
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
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🚫 Prevent deleting superadmin
    if (user.email === process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "You cannot delete the Superadmin!" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
