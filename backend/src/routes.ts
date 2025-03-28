import express from "express";
import pool from "./db";
import { error } from "console";

const router = express.Router();

// Insert form data
router.post("/submit", async (req, res) => {
  const { name, contact, address1, address2, pincode, city, state, country } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (name, contact, address1, address2, pincode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, contact, address1, address2, pincode, city, state, country]
    );
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err: unknown) {
    if (err instanceof Error){
      res.status(500).json({ error:err.message})
    }
    else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
});

// Get form data
router.get("/users", async (_, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err: unknown) {
    if (err instanceof Error){
      res.status(500).json({ error:err.message})
    }
    else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
});

export default router;
