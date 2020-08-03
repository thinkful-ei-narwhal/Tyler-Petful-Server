const express = require("express");
const People = require("./people.service");
const parser = require("body-parser");

const peopleRouter = express.Router();

const jsonBodyParser = parser.json();

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

peopleRouter.post("/", jsonBodyParser, async (req, res) => {
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
  const people = await People.enqueue(newPerson);
  res.status(201).json(people);
});

peopleRouter.delete("/", jsonBodyParser, (req, res) => {
  People.dequeue();

  return res.status(204).end();
});

module.exports = peopleRouter;
