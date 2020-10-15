// Given n non-negative integers a_1, a_2, ..., a_n, where each represents a point at coordinate (i, a_i).
// n vertical lines are drawn such that the two endpoints of line i is at (i, a_i) and (i, 0).
// Find two lines, which together with x-axis forms a container, such that the container contains the most water.
//
// Note: You may not slant the container and n is at least 2.
//
// Example:
//
// Input: [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: In this case, the max area of water (between the second 8 and 7) the container can contain is 49.

/**
 * @param {number[]} height
 * @return {number}
 */

/** 1) Brute force */
// Time O(n^2)
// Space O(1)
const maxArea1 = (heights) => {
  let max = 0;
  for (let i = 0; i < heights.length; i++) {
    for (let j = i + 1; j < heights.length; j++) {
      max = Math.max(
        max,
        Math.min(heights[i], heights[j]) * (j - i),
      );
    }
  }
  return max;
};

/** 2) Two pointers */
// Time O(n)
// Space O(1)
//
// This is done since a relatively longer line obtained by moving the shorter line's pointer might overcome the reduction in area caused by the width reduction.
// Proof (https://leetcode.com/problems/container-with-most-water/discuss/6099/Yet-another-way-to-see-what-happens-in-the-O(n)-algorithm)
//
// Draw a matrix where the row is the first line, and the column is the second line. For example, say n=6.
//
// In the figures below, x means we don't need to compute the volume for that case:
// (1) On the diagonal, the two lines are overlapped;
// (2) The lower left triangle area of the matrix is symmetric to the upper right area.
//
// We start by computing the volume at (1,6), denoted by o.
// Now if the left line is shorter than the right line, then all the elements left to (1,6) on the first row have smaller volume, so we don't need to compute those cases (crossed by ---).
//
//   1 2 3 4 5 6
// 1 x ------- o
// 2 x x
// 3 x x x
// 4 x x x x
// 5 x x x x x
// 6 x x x x x x
//
// Next we move the left line and compute (2,6). Now if the right line is shorter, all cases below (2,6) are eliminated.
//
//   1 2 3 4 5 6
// 1 x ------- o
// 2 x x       o
// 3 x x x     |
// 4 x x x x   |
// 5 x x x x x |
// 6 x x x x x x
//
// And no matter how this o path goes, we end up only need to find the max value on this path, which contains n-1 cases.
//
//   1 2 3 4 5 6
// 1 x ------- o
// 2 x x - o o o
// 3 x x x o | |
// 4 x x x x | |
// 5 x x x x x |
// 6 x x x x x x

const maxArea = (heights) => {
  let max = 0;

  let l = 0;
  let r = heights.length - 1;

  while (l < r) {
    max = Math.max(
      max,
      Math.min(heights[l], heights[r]) * (r - l),
    );

    if (heights[l] < heights[r]) l++;
    else r--;
  }
  return max;
};
