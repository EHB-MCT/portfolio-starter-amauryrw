const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to my API" });
});

app.get("/info", (req, res) => {
  res.send({ message: "Information" });
  console.log("Hello, world!");
});

// Route POST
app.post("/create", (req, res) => {
  const data = req.body;
  res.send({ message: "Data has been created", data });
});

// Route DELETE
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  res.send({ message: `Data with ID ${id} has been deleted` });
});

// Route PUT
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  res.send({ message: `Data with ID ${id} has been updated`, data });
});

app.listen(3000, (err) => {
  if (!err) {
    console.log("Running on port 3000");
  } else {
    console.log(err);
  }
});
