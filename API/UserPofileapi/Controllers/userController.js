import User from "../Models/userModels.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const Email = req.body.email;
    const Password = req.body.password;
    const emailSaved = await User.findOne({ email: Email });
    console.log(emailSaved);
    if (!emailSaved) {
      return res.status(401).json({ message: "User not found." });
    } else {
      const eMatch = await bcrypt.compare(Password, emailSaved.password);
      if (!eMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }

      res
        .status(200)
        .json({ message: "user details is correct and is logged in." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUser = (req, res) => {
  try {
    res.json("cc");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
