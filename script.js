// JavaScript Data Structure fundamental's 🔮

// Trees 🌲 🌲 🌲

const treesBlock = () => {
  //
  class Node {
    constructor(value, parentNode = null) {
      this.value = value;
      this.children = [];
      this.parent = parentNode;
    }

    addNode(value) {
      const segments = value.split("/");

      if (segments.length === 0) return;
      if (segments.length === 1) {
        const newNode = new Node(value, this);
        this.children.push(newNode);
        return { node: newNode, index: this.children.length - 1 };
      }

      const currentNode = this.children.find(
        (node) => node.value === segments[0]
      );

      if (currentNode) {
        currentNode.addNode(segments.slice(1).join("/"));
      } else {
        const newNode = new Node(segments[0], this);
        this.children.push(newNode);
        newNode.addNode(segments.slice(1).join("/"));
        return { node: newNode, index: this.children.length - 1 };
      }
    }

    removeNode(nodeValue) {
      // const nodeToRemove = this.children.find((node) => node.value === nodeValue);
      // if (nodeToRemove) {
      //   nodeToRemove.parent.children = nodeToRemove.parent.children.filter(
      //     (node) => node.value !== nodeValue
      //   );
      //   return;
      // }

      const digging = (childrenArray) => {
        for (let node of childrenArray) {
          if (node.value === nodeValue) {
            node.parent.children = node.parent.children.filter(
              (node) => node.value !== nodeValue
            );
            return;
          }

          if (node.children.length !== 0) {
            digging(node.children);
          }
        }
      };

      digging(this.children);
    }
  }

  class Tree {
    constructor(value) {
      this.root = new Node(value);
    }

    add(value) {
      this.root.addNode(value);
    }

    remove(nodeValue) {
      this.root.removeNode(nodeValue);
    }
  }

  const fileSystem = new Tree("/");
  // const gamesNodeData = fileSystem.root.addNode("games");
  // const filesNodeData = fileSystem.root.addNode("files");
  // gamesNodeData.node.addNode("COD.exe");
  // fileSystem.root.removeNode(gamesNodeData.index);
  fileSystem.add("games");
  fileSystem.add("files");

  fileSystem.add("games/war/code.exe");
  fileSystem.remove("war");

  console.log(fileSystem);
};

// treesBlock();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Binary Search Trees BST 🍁 🍁 🍁

const binaryTreeBlock = () => {
  //
  class Node {
    //
    constructor(value = null, parent = null) {
      this.value = value;
      this.parent = parent;
      this.right = null;
      this.left = null;
    }

    //

    add(value) {
      if (this.value > value) {
        if (this.left) {
          this.left.add(value);
          return;
        }
        this.left = new Node(value, this);
        return;
      }

      if (this.value < value) {
        if (this.right) {
          this.right.add(value);
          return;
        }
        this.right = new Node(value, this);
        return;
      }
    }

    remove(value) {
      const nodeToRemove = this.find(value);
      if (nodeToRemove) {
        if (nodeToRemove?.parent?.left.value == value) {
          nodeToRemove.parent.left = null;
          return;
        }

        if (nodeToRemove?.parent?.right.value == value) {
          nodeToRemove.parent.right = null;
          return;
        }
      }
    }

    find(value) {
      if (this.value == value) {
        return this;
      }

      if (this.value < value && this.right) {
        return this.right.find(value);
      }

      if (this.value > value && this.left) {
        return this.left.find(value);
      }
    }

    //
  }

  //

  class BinaryTree {
    //
    constructor(root) {
      this.root = new Node(root);
    }

    //

    add(value) {
      this.root.add(value);
    }

    remove(value) {
      this.root.remove(value);
    }

    find(value) {
      return this.root.find(value);
    }

    //
  }

  // - - -- - - - - -- - - - - - - -

  const myBinaryTree = new BinaryTree(10);
  myBinaryTree.add(5);
  myBinaryTree.add(7);
  myBinaryTree.add(3);
  myBinaryTree.add(12);
  myBinaryTree.add(15);
  myBinaryTree.add(1);
  myBinaryTree.remove(12);

  console.log(myBinaryTree);
};
// binaryTreeBlock();

const TrieBlock = () => {
  class TrieNode {
    constructor() {
      this.value = null;
      this.children = Array(26);
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(key, value) {
      let node = this.root;
      for (let i = 0; i < key.length; i++) {
        const alphabetIndex = key[i].charCodeAt(0) - 97;
        if (!node.children[alphabetIndex]) {
          const newNode = new TrieNode();
          node.children[alphabetIndex] = newNode;
        }
        node = node.children[alphabetIndex];
      }
      node.value = value;
    }

    find(key) {
      let node = this.root;

      for (let i = 0; i < key.length; i++) {
        const alphabetIndex = key[i].charCodeAt(0) - 97;

        if (!node.children[alphabetIndex]) {
          return false;
        }
        node = node.children[alphabetIndex];
      }

      return node;
    }

    delete(key) {
      const node = this.find(key);
      if (node) {
        node.value = null;
      }
    }
  }

  const myTrie = new Trie();

  myTrie.insert("age", 30);
  myTrie.insert("name", "Mohamed");
  myTrie.insert("hobby", "gaming");

  console.log(myTrie.find("name"));
  myTrie.delete("age");
  console.log(myTrie);
};

// TrieBlock();

const PriorityQueueBlock = () => {
  //

  class Node {
    constructor(value, priority) {
      this.value = value;
      this.next = null;
      this.priority = priority;
    }
  }

  class PriorityQueue {
    constructor() {
      this.first = null;
    }

    insert(value, priority) {
      const newNode = new Node(value, priority);
      if (!this.first || priority > this.first.priority) {
        newNode.next = this.first;
        this.first = newNode;
      } else {
        let currentNode = this.first;

        while (currentNode.next && priority < currentNode.next.priority) {
          currentNode = currentNode.next;
        }

        newNode.next = currentNode.next;
        currentNode.next = newNode;
      }
    }

    process() {
      const first = this.first;
      this.first = this.first.next;
      return first;
    }
  }

  const queue = new PriorityQueue();

  queue.insert("1", 1);
  queue.insert("2", 22);
  queue.insert("3", 35);

  console.log(queue);

  //
};

// PriorityQueueBlock();

//Graph
class Graph {
  constructor() {
    this.nodes = {};
    this.edges = {};
  }

  addNode(identifier, value) {
    if (this.nodes[identifier]) {
      throw new Error("Node exists already!");
    }
    this.nodes[identifier] = value;
  }

  addEdge(startNode, endNode) {
    if (!this.edges[startNode] || !this.edges[endNode]) {
      throw new Error("Start or end node does not exist!");
    }
    if (
      this.edges[startNode] &&
      this.edges[startNode].indexOf(endNode) === -1
    ) {
      this.edges[startNode].push(endNode);
    } else {
      this.edges[startNode] = [endNode];
    }
  }
}

const graph = new Graph();

graph.addNode(1, "a");
graph.addNode(2, "b");
graph.addNode(3, "c");

graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(3, 2);

console.log(graph);
