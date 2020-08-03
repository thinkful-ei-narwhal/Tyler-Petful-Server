const Queue = require("../queue/Queue");
const store = require("../../store");

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
    return pets;
  },

  enqueue(pet, type) {
    if (type === "cat") {
      pets.cats.enqueue(pet);
    } else if (type === "dog") {
      pets.dogs.enqueue(pet);
    }
  },

  dequeue(type) {
    if (type === "cat") {
      return pets.cats.dequeue();
    } else if (type === "dog") {
      return pets.dogs.dequeue();
    }
  },
};
