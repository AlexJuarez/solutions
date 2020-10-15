// Given four lists A, B, C, D of integer values, compute how many tuples (i, j, k, l) there are such that A[i] + B[j] + C[k] + D[l] is zero.
//
// To make problem a bit easier, all A, B, C, D have same length of N where 0 ≤ N ≤ 500. All integers are in the range of -228 to 228 - 1 and the result is guaranteed to be at most 231 - 1.
//
// Example:
//
// Input:
// A = [ 1, 2]
// B = [-2,-1]
// C = [-1, 2]
// D = [ 0, 2]
//
// Output:
// 2
//
// Explanation:
// The two tuples are:
// 1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
// 2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */

// Idea
// The paths through the column vectors A, B, C, and D with zero sum can be found by
// first counting the paths halfway through with sum A[i] + B[j] and then checking if their additive inverses exist as C[k] + D[l].
//
// Time O(n^2)
// Space O(n^2)
const fourSumCount = (A, B, C, D) => {
  const map = {};
  for (const a of A) {
    for (const b of B) {
      if (map[a + b] == null) map[a + b] = 0;
      map[a + b]++;
    }
  }

  let count = 0;
  for (const c of C) {
    for (const d of D) {
      if (map[- c - d] != null) {
        count += map[- c - d];
      }
    }
  }
  return count;
};
