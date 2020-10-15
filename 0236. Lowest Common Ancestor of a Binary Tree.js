// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
//
// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow a node to be a descendant of itself).”
//
// Given the following binary search tree: root = [3,5,1,6,2,0,8,null,null,7,4]
//
//        3
//       /  \
//     5      1
//    / \    / \
//   6   2  0   8
//      / \
//     7   4
//
// Example 1:
//
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
//
// Example 2:
//
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
//
// Note:
//
// - All of the nodes' values will be unique.
// - p and q are different and both values will exist in the binary tree.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = (root, p, q) => {
  const find = (node) => {
    if (node == null) return null;
    if (node === p || node === q) return node;

    const l = find(node.left);
    const r = find(node.right);

    if (l == null) return r; // p and q are both in the right side
    if (r == null) return l; // p and q are both in the left side
    return node; // p and q are in different sides
  };

  return find(root);
};
