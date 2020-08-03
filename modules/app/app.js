require("dotenv").config();
const express = require("express");
const { NODE_ENV } = require("../config");
const cors = require("cors");
const petsRouter = require("../pets/pets.router");
const peopleRouter = require("../people/people.router");

const app = express();

app.use(cors());

app.use("/api/people", peopleRouter);
app.use("/api/pets", petsRouter);

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "Server Error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

module.exports = app;
