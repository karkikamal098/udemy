import User from '../Models/userModels.js';


export const registerUser = (req, res) => {
  try {
    res.json("aa");
  } catch (e) {
    res.status(500).json(e.message);
  }
};


export const loginUser = (req,res) => {
  try {
    res.json("bb");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUser = (req,res) => {
  try {
    res.json("cc");
  } catch (error) {
    res.status(500).json(error.message);
  }
};


