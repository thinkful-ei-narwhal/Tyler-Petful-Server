const Queue = require("../queue/Queue");
const store = require("../../store");

// Set up initial data.
// --------------------

const people = new Queue();
store.people.forEach((person) => people.enqueue(person));

// --------------------

module.exports = {
  get() {
    // Return all people in the queue.
    const names = [];
    let node = people.first;

    while (node) {
      names.push(node.value);
      node = node.next;
    }
    return names;
  },

  enqueue(person) {
    // Add a person to the queue.
    people.enqueue(person);
  },

  dequeue() {
    // Remove a person from the queue.
    if (people.first === null) {
      return { removed: null };
    }
    return { removed: people.dequeue() };
  },
};
