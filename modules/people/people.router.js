const express = require("express");
const json = require("body-parser");

const People = require("./people.service");

const peopleRouter = express.Router();

peopleRouter.get("/", (req, res) => {
  // Return all the people currently in the queue.
  const people = People.get();

  if (!people) {
    return res.status(404).json({
      error: { message: "There Are No Pets!" },
    });
  }
  res.status(200).json(people);
});

peopleRouter.post("/", json, (req, res) => {
  // Add a new person to the queue.
  const { name } = req.body;
  const newPerson = name;
  // eslint-disable-next-line eqeqeq
  for (const [key, value] of Object.entries(newPerson))
    if (value == null) {
      return res
        .status(400)
        .json({ error: `Missing '${key}' in request body` });
    }
  const people = People.enqueue(newPerson);
  res.status(201).json(people);
});

peopleRouter.delete("/", json.json(), (req, res) => {
  People.dequeue();

  return res.status(204).end();
});

module.exports = peopleRouter;
