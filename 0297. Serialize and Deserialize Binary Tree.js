// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
//
// Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
//
// Example:
//
// You may serialize the following tree:
//
//     1
//    / \
//   2   3
//      / \
//     4   5
//
// as "[1,2,3,null,null,4,5]"
//
// Clarification: Just the same as how LeetCode OJ serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
//
// Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.

/** 1) Cheating */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const serialize1 = (root) => {
  return JSON.stringify(root);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize1 = (data) => {
  return JSON.parse(data);
};

/** 2) BFS */
//    1
//   / \
//  2   3
//     / \
//    4   5
//
// data = [1, 2, 3, null, null, 4, 5, null, null, null, null]
const serialize2 = (root) => {
  let q = [];
  let data = [];

  if (root) q.push(root);

  while (q.length) {
    root = q.shift();

    if (root != null) {
      data.push(root.val);

      q.push(root.left || null);
      q.push(root.right || null);
    } else {
      data.push(null);
    }
  }
  return data;
};

const deserialize2 = (data) => {
  if (!data.length) return null;

  const root = new TreeNode(data.shift());
  const q = [root];

  while (q.length) {
    const node = q.shift();

    let val = data.shift();
    node.left = val !== null ? new TreeNode(val) : null;

    val = data.shift();
    node.right = val !== null ? new TreeNode(val) : null;

    if (node.left != null) q.push(node.left);
    if (node.right != null) q.push(node.right);
  }

  return root;
};

/** 3) DFS */
// Time O(n)
// Space O(n)
//
// e.g.
//    1
//   / \
//  2   3
//     / \
//    4   5
//
// data = [1, 2, null, null, 3, 4, null, null, 5, null, null]
const serialize = (root) => {
  let data = [];

  const go = (node) => {
    if (node == null) {
      data.push(null);
      return;
    }

    data.push(node.val);
    go(node.left);
    go(node.right);
  };

  go(root);
  return data;
};

const deserialize = (data) => {
  const go = () => {
    if (data.length === 0) return;

    const val = data.shift();
    if (val == null) return null;

    const node = new TreeNode(val);
    node.left = go();
    node.right = go();
    return node;
  };

  return go();
};
