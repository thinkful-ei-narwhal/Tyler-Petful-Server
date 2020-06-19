const express = require("express");
const json = require("body-parser");

const People = require("./people.service");
const { people } = require("../../store");

const router = express.Router();

router.get("/", (req, res) => {
  // Return all the people currently in the queue.
  return res.status(200).json({ people: People.get() });
});

router.post("/", json.json(), (req, res) => {
  // Add a new person to the queue.
  const person = req.body.name;
  People.enqueue(person);

  return res.status(201).json({ name: person });
});

router.delete("/", json, (req, res) => {
  // Remove a pet from adoption.

  return res.status(200).json(People.dequeue());
});

module.exports = router;
