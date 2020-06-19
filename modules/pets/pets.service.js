const Queue = require('../queue/Queue');
const store = require('../../store');

// Set up initial data.
// --------------------

const pets = {
	cats: new Queue(),
	dogs: new Queue(),
};

store.cats.forEach((cat) => pets.cats.enqueue(cat));
store.dogs.forEach((dog) => pets.dogs.enqueue(dog));

// --------------------

module.exports = {
	get() {
		// Return the pets next in line to be adopted.
		if (pets.cats.first === null && pets.dogs.first === null) {
			return null;
		}
		if (pets.cats.first === null && pets.dogs.first !== null) {
			return {
				dog: pets.dogs.first.value,
			};
		}
		if (pets.cats.first !== null && pets.dogs.first === null) {
			return {
				cat: pets.cats.first.value,
			};
		}
		return {
			cat: pets.cats.first.value,
			dog: pets.dogs.first.value,
		};
	},

	dequeue(type) {
		// Remove a pet from the queue.
		if (type === 'cat') {
			return { removed: pets.cats.dequeue() };
		}
		if (type === 'dog') {
			return { removed: pets.dogs.dequeue() };
		}
	},
};
