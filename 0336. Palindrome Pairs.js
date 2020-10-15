// Given a list of unique words, find all pairs of distinct indices (i, j) in the given list, so that the concatenation of the two words, i.e. words[i] + words[j] is a palindrome.
//
// Example 1:
// Given words = ["bat", "tab", "cat"]
// Return [[0, 1], [1, 0]]
// The palindromes are ["battab", "tabbat"]
//
// Example 2:
// Given words = ["abcd", "dcba", "lls", "s", "sssll"]
// Return [[0, 1], [1, 0], [3, 2], [2, 4]]
// The palindromes are ["dcbaabcd", "abcddcba", "slls", "llssssll"]

/**
 * @param {string[]} words
 * @return {number[][]}
 */

// https://leetcode.com/problems/palindrome-pairs/discuss/79215/Easy-to-understand-AC-C++-solution-O(n*k2)-using-map
//
// Idea
// Build a map whose key is the reversed string, value is index in array
//
// Time O(n * k^2), k is the average length of words
//   In the main logic, the outer loop is O(n) since it's iterating through all the words in array.
//   In the inner loop, split into left part and right part have k possibilities, let k be the average length of words, then when using isPalindrome for each combination, it's also k time in average, so in total it's n * (k * k)
// Space O(n)

const palindromePairs = (words) => {
  const map = {};

  for (let i = 0; i < words.length; i++) {
    const reversed = words[i].split('').reverse().join('');
    map[reversed] = i;
  }

  let res = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];

    // special treatment for ''
    if (map[''] != null && isPalindrome(w) && w !== '') { // w !== '' make sure '' not matching itself
      res.push([map[''], i]); // 1) if self is palindrome, covers ['', self]
    }

    for (let j = 0; j < w.length; j++) {
      const l = w.slice(0, j);
      const r = w.slice(j);

      // e.g. 'cdc ab' and 'ba'
      if (isPalindrome(l) && map[r] != null && map[r] !== i) { // map[r] !== i make sure not matching itself, e.g. exclude 'a' with itself 'a'
        res.push([map[r], i]);
      }

      if (isPalindrome(r) && map[l] != null && map[l] !== i) {
        res.push([i, map[l]]); // 2) when j = 0, l = '', r = self, so here covers [self, '']
      }
    }
  }
  return res;
};

const isPalindrome = (w) => {
  for (let i = 0; i < w.length / 2; i++) {
    if (w[i] !== w[w.length - 1 - i]) return false;
  }
  return true;
};
