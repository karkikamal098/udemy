// HINTS:
// 1. Import express and axios
import express, { urlencoded } from "express";
import axios from "axios";
import path from "path";

// 2. Create an express app and set the port number.
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );

    const secretData = response.data.secret;
    const username = response.data.username;

    console.log("Secret:", secretData);
    console.log("Username:", username);

    res.render("index.ejs", {
      secret: secretData,
      user: username,
    });
  } catch (error) {
    console.error("Error fetching secret:", error.message);
    res.status(500).send("Error fetching secret");
  }
});

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

app.listen(PORT, () => {
  console.log("App is running on port 3000");
});
