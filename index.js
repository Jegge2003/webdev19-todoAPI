const express = require("express"); //Importing express using the ES5 import style

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todoAPI").then(() => {
  console.log("Connected to MongoDB");
});

const app = express(); //This creates the express application

app.use(express.json());

const todos = require("./routes/todos");

app.use("/api/todos", todos);

app.listen(8080, () => {
  console.log("Server has started");
});
