import User from "../Models/userModels.js";
import bcrypt from "bcrypt";
import http from "http";
import Cookies from "cookies";
import jwt from "jsonwebtoken";


const createToken = (_id) =>{
   return jwt.sign({_id},process.env.SECRET, { expiresIn: '1h' });
}


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
    const token=createToken(User._id)
    console.log(token);
    await res.cookie("jwt", token, {httpOnly: true, maxAge: 3600})
    const Email = req.body.email;
    const Password = req.body.password;
    const emailSaved = await User.findOne({ email: Email });
    if (!emailSaved) {
      return res.status(401).json({ message: "User not found." });
    } else {
      const eMatch = await bcrypt.compare(Password, emailSaved.password);
      if (!eMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }

      res
        .status(200)
        .json({user: User._id });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUser = async(req, res) => {
  try {
    const deleteId = req.params.id;
    console.log(deleteId);
    const UserToDel= await User.deleteOne({_id:deleteId});
    console.log(UserToDel);
    res.json(UserToDel);

  } catch (error) {
    res.status(500).json(error.message);
  }
};
