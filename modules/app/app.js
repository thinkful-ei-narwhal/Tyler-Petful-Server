require("dotenv").config();
const express = require("express");
const { NODE_ENV, CLIENT_ORIGIN } = require("../config");
const cors = require("cors");
const petsRouter = require("../pets/pets.router");
const peopleRouter = require("../people/people.router");

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.use("/api/people", peopleRouter);
app.use("/api/pets", petsRouter);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

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
