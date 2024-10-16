import express, { urlencoded } from "express";
import axios from "axios";

const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const config = {
  headers: { "apikey": "e50127cd46c449e48d2a57cbf48ac282",
             "Content-Type": "application/json"
   },
};

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    shortenedURL: ""
  });
});

app.post("/shortUrl", async (req, res) => {
    try {
        const destination = req.body.url;
        console.log(destination);
        const result1 = await axios.post(
          "https://api.rebrandly.com/v1/links",
          { destination },
          config
        );
        console.log("Response from Api: ", result1.data)
        res.render("index.ejs", {
            shortenedURL: JSON.stringify(result1.body.shortUrl) || "haha",
        });
    } catch (error) {
        console.error("Error creating short URL:", error.message);
        shortenedURL = "Error creating short URL";
    }
 
});

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
