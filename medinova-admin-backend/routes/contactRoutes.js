import express from "express";
import Contact from "../models/Contact.js"; // use the exact model name

const router = express.Router();

// ======================== GET ALL CONTACT MESSAGES ========================
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch contacts." });
  }
});

// ======================== DELETE A CONTACT MESSAGE ========================
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact message not found." });
    }
    await contact.deleteOne(); // delete from DB
    res.status(200).json({ message: "Contact message deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete contact message." });
  }
});

export default router;
