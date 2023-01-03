// JavaScript Data Structure fundamental's 🔮

// Trees 🌲 🌲 🌲

class Node {
  constructor(value, parentNode = null) {
    this.value = value;
    this.children = [];
    this.parent = parentNode;
  }

  addNode(value) {
    const segments = value.split("/");
    // console.log(segments);
    // console.log(this.children[0]?.value);

    const newNode = new Node(value, this);
    this.children.push(newNode);
    return { node: newNode, index: this.children.length - 1 };
  }

  removeNode(index) {
    this.children.splice(index, 1);
  }
}

class Tree {
  constructor(value) {
    this.root = new Node(value);
  }

  add(value) {
    this.root.addNode(value);
  }
}

const fileSystem = new Tree("/");
// const gamesNodeData = fileSystem.root.addNode("games");
// const filesNodeData = fileSystem.root.addNode("files");
// gamesNodeData.node.addNode("COD.exe");
// fileSystem.root.removeNode(gamesNodeData.index);
fileSystem.add("games");
fileSystem.add("files");

// fileSystem.add("games/games/g3");

console.log(fileSystem);
