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
    const nodeToRemove = this.children.find((node) => node.value === nodeValue);
    if (nodeToRemove) {
      nodeToRemove.parent.children = nodeToRemove.parent.children.filter(
        (node) => node.value !== nodeValue
      );
      return;
    }

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
