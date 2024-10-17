import express from "express";
import axios from "axios";


const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const Port = process.env.PORT || 3000;

const config= {
headers: {
    Apikey: "b85c5e2a-141c-4b22-94fd-70ba9e239f13"
}
}

app.get("/", async (req, res) => {
    const source = req.query.source || "USD";  // Default to USD if not provided
    const destination = req.query.destination || "EUR";  // Default to EUR if not provided
  try {
    const responseResult = await axios.get(
        "https://api.cloudmersive.com/currency/exchange-rates/convert/:source/to/:destination", config
    );
    res.render("index.ejs", { convertedCurrency: responseResult.data.convertedAmount });
  } catch(error) {
    console.error("Error occurred", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Error converting currency." });
  }
});

app.listen(Port, () => {
  console.log(`listening on ${Port}`);
});
