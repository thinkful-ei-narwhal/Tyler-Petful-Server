class Queue {
  constructor() {
    // Set initial data.
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _NodeQ(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }
    //make the new node the last item on the queue
    this.last = node;
  }

  dequeue() {
    //if the queue is empty, there is nothing to return
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    //if this is the last item in the queue
    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }

  show() {
    //if the top of the stack does not have anything
    //then the stack is empty
    //otherwise return what's on the top
    if (s.top === null) {
      return null;
    }

    return s.top.data;
  }

  all() {
    let node = newStack.top;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  }
}

class _NodeQ {
  constructor(value) {
    this.value = null;
    this.next = null;
  }
}

module.exports = Queue;
