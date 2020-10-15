// The count-and-say sequence is the sequence of integers with the first five terms as following:
//
// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
//
// 1 is read off as "one 1" or 11.
// 11 is read off as "two 1s" or 21.
// 21 is read off as "one 2, then one 1" or 1211.
// Given an integer n, generate the nth term of the count-and-say sequence.
//
// Note: Each term of the sequence of integers will be represented as a string.
//
// Example 1:
//
// Input: 1
// Output: "1"
//
// Example 2:
//
// Input: 4
// Output: "1211"

/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = (n) => {
  let res = '1';
  for (let i = 1; i < n; i++) {
    res = say(res);
  }
  return res;
};

const say = (s) => {
  let res = '';
  let count = 0;
  let num = s[0];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === num) {
      count++;
    } else {
      res += count + s[i - 1];
      count = 1;
      num = s[i];
    }
  }
  return res + count + num;
};
