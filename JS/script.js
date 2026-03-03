console.log("hello world");

//  Flatten Nested Array
//  Group By Property
//  Sort Array of Objects
//  Find Frequency of Elements
//  Find First Non-Repeating Character
//  Remove Duplicates from Array
//  Chunk Array
//  Find Missing Number
//  Deep Clone Object (use weakmap for circular dep handling)
//  Merge Two Sorted Arrays
//  Array Intersection
//  Convert Array → Object Map
//  Reverse Words in Sentence
//  Debounce Function
//  Throttle Function
//  Promise.all Polyfill
//  Currying Function
//  Implement Memoization
//  Find Longest unique substring in string

// 1. Flatten Nested Array

function flattenArray(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

// "444522999922233" -> "4351259432"
function frequencyMapStr(str) {
  let newStr = "";
  var a = 5;

  const strArray = str.split("");

  const frequencyMap = strArray.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  for (let i = 0; i < strArray.length; i++) {
    if (frequencyMap[strArray[i]] > 0) {
      var c = 5;
      const numfreqstr = strArray[i] + frequencyMap[strArray[i]].toString();
      newStr = newStr.concat(numfreqstr);
      frequencyMap[strArray[i]] = 0;
    }
  }

  return newStr;
}

console.log(frequencyMapStr("444522999922233"));

// longest substring in string
function longestSubstring(str) {
  let map = new Map();
  let left = 0;
  let maxLen = 0;
  let start = 0;

  for (let right = 0; right < str.length; right++) {

    if (map.has(str[right]) && map.get(str[right]) >= left) {
      left = map.get(str[right]) + 1;
    }

    map.set(str[right], right);

    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1;
      start = left;
    }
  }

  return str.substring(start, start + maxLen);
}

