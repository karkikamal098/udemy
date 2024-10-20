// Importing required modules
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";    

// initialize
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors())



// routes
import userRoutes from "./routes/userRoutes.js";


// using routes
app.use("/api/users", userRoutes);




//connecting to the mongodb server
// Replace the <connection-string> with your MongoDB connection string.
mongoose
  .connect(process.env.mongoDB)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Running in the port 3000 ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.error("Error in mongodb connection is: ", error);
  });
