import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "jackbauer";
const yourPassword = "IAmTheBest";
const yourAPIKey = "aaa";
const yourBearerToken = "359f5d3f-5531-40df-95a1-6993103508ac";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/random`);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(500).send(error.message); // Changed to 500 for server errors
  }
});

// Basic Auth route
app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const responseEnd = JSON.stringify(response.data); // Fixed to get `data`
    res.render("index.ejs", { content: responseEnd });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// API Key route
app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/filter`, {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Bearer Token route
app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/secrets/2`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });

    if (response.data) {
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    } else {
      res.render("index.ejs", { content: "No data found." });
    }

  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
