// There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.
//
// Example 1:
//
// Input:
// [
//   "wrt",
//   "wrf",
//   "er",
//   "ett",
//   "rftt"
// ]
//
// Output: "wertf"
//
// Example 2:
//
// Input:
// [
//   "z",
//   "x"
// ]
//
// Output: "zx"
//
// Example 3:
//
// Input:
// [
//   "z",
//   "x",
//   "z"
// ]
//
// Output: ""
//
// Explanation: The order is invalid, so return "".
//
// Note:
//
// You may assume all letters are in lowercase.
// You may assume that if a is a prefix of b, then a must appear before b in the given dictionary.
// If the order is invalid, return an empty string.
// There may be multiple valid order of letters, return any one of them is fine.

/**
 * @param {string[]} words
 * @return {string}
 */

/** Topological Sorting + BFS */
// Similar
// 210. Course Schedule II
// 269. Alien Dictionary
//
// https://www.youtube.com/watch?v=RIrTuf4DfPE
const alienOrder = (words) => {
  // Build graph
  const g = {};
  const inDegrees = {};

  for (const w of words) {
    for (const c of w) {
      inDegrees[c] = 0;
      g[c] = new Set();
    }
  }

  for (let i = 1; i < words.length; i++) {
    const w1 = words[i - 1];
    const w2 = words[i];

    const len = Math.min(w1.length, w2.length);
    for (let j = 0; j < len; j++) {
      const c1 = w1[j];
      const c2 = w2[j];

      if (c1 !== c2) {
        if (!g[c1].has(c2)) {
          g[c1].add(c2);
          inDegrees[c2]++;
        }
        break;
      }
    }
  }

  // BFS
  let s = '';
  const q = [];

  for (const c in inDegrees) {
    if (inDegrees[c] === 0) q.push(c);
  }

  while (q.length) {
    const c1 = q.shift();
    s += c1;
    for (const c2 of g[c1]) {
      inDegrees[c2]--;
      if (inDegrees[c2] === 0) {
        q.push(c2);
      }
    }
  }

  return s.length === Object.keys(g).length ? s : '';
};
