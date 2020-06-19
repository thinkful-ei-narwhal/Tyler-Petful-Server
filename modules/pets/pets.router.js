const express = require("express");
const json = require("body-parser");

const Pets = require("./pets.service");
const People = require("../people/people.service");

const router = express.Router();

router.get("/", (req, res) => {
  // Return all pets currently up for adoption.
  return res.status(200).json(Pets.get());
});

router.delete("/", json.json(), (req, res) => {
  // Remove a pet from adoption.
  const { type } = req.query;
  Pets.dequeue(type);
  return res.status(204).end();
});

module.exports = router;
