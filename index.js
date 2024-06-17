const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./model/user");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.USERNAME;
const password = process.env.PASSWORD;


mongoose
  .connect(
    `mongodb+srv://${username}:${password}@registration.wminhwz.mongodb.net/`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Not connected to database", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await user.save();
    res.send("Data has been saved to the database");
  } catch (error) {
    res.status(500).send(error);
  }
});
