const express = require('express');
const json = require('body-parser').json();

const People = require('./people.service');
const { people } = require('../../store');

const router = express.Router();

router.get('/', (req, res) => {
	// Return all the people currently in the queue.
	return res.status(200).json({ people: People.get() });
});

router.post('/', json, (req, res) => {
	// Add a new person to the queue.
	const person = req.body.name;

	People.enqueue(person);

	return res.status(201).json({ name: person });
});

module.exports = router;
