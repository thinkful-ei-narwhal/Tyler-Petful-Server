const express = require("express");
const json = require("body-parser");
const { CLIENT_ORIGIN } = require("../config");

const Pets = require("./pets.service");

const petsRouter = express.Router();
const parser = json.json();
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `${CLIENT_ORIGIN}`); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
petsRouter.get("/", (req, res) => {
  // Return all pets currently up for adoption.

  const pets = Pets.get();

  if (!pets) {
    return res.status(404).json({
      error: {
        message:
          "All pets have found a happy home :) Thank you for your support!",
      },
    });
  }
  return res.status(200).json(pets);
});

petsRouter.delete("/:type", parser, (req, res) => {
  // Remove a pet from adoption.
  const { type } = req.params;
  let pet = Pets.dequeue(type);
  Pets.enqueue(pet, type);
  return res.status(204).end();
});

module.exports = petsRouter;
