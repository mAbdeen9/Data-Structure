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

TrieBlock();
