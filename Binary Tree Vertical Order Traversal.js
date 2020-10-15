/**
Given a binary tree, return the vertical order traversal of its nodes' values. (ie, from top to bottom, column by column).

If two nodes are in the same row and column, the order should be from left to right.

Examples:

    Given binary tree [3,9,20,null,null,15,7],

       3
      /\
     /  \
     9  20
        /\
       /  \
      15   7

    return its vertical order traversal as:

    [
      [9],
      [3,15],
      [20],
      [7]
    ]

    Given binary tree [3,9,8,4,0,1,7],

         3
        /\
       /  \
       9   8
      /\  /\
     /  \/  \
     4  01   7

    return its vertical order traversal as:

    [
      [4],
      [9],
      [3,0,1],
      [8],
      [7]
    ]

    Given binary tree [3,9,8,4,0,1,7,null,null,null,2,5] (0's right child is 2 and 1's left child is 5),

         3
        /\
       /  \
       9   8
      /\  /\
     /  \/  \
     4  01   7
        /\
       /  \
       5   2

    return its vertical order traversal as:

    [
      [4],
      [9,5],
      [3,0,1],
      [8,2],
      [7]
    ]


*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
 
function TreeColumnNode(col, node) {
    this.col = col;
    this.treeNode = node;
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalOrder = function(root) {
    let col = 0;
    let node = root;
    let queue = [];
    let result = [];
    let map = {};
    let min = 0;
    let max = 0;
    
    if (!node) {
        return result;
    }
    
    queue.push(new TreeColumnNode(0, root));
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        if (map[node.col] === undefined) {
            map[node.col] = [];
        }
        
        map[node.col].push(node.treeNode.val);
        
        if (node.treeNode.left) {
            queue.push(new TreeColumnNode(node.col - 1, node.treeNode.left));
            min = Math.min(min, node.col - 1);
        }
        
        if (node.treeNode.right) {
            queue.push(new TreeColumnNode(node.col + 1, node.treeNode.right));
            max = Math.max(max, node.col + 1);
        }
    }
    
    for (let i = min; i <= max; i++) {
        result.push(map[i]);
    }
    
    return result;
};

function helper(node, col, arr) {
    if (!node) {
        return;
    }
    
    if (node.left) {
        if (arr[col] === undefined) {
            arr[col - 1] = [];
        }
        
        arr[col - 1].push(node.left);
    }
    
    if (node.right) {
        if (arr[col] === undefined) {
            arr[col + 1] = [];
        }
        
        arr[col + 1].push(node.right);
    }
    
    helper(node.left, col - 1, arr);
    helper(node.right, col + 1, arr);
}
