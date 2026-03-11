// ======================================================
// FRONTEND INTERVIEW CORE JS QUESTIONS
// ======================================================


// ------------------------------------------------------
// 1. Flatten Nested Array
// ------------------------------------------------------

function flatten(arr) {
  let res = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item));
    } else {
      res.push(item);
    }
  }

  return res;
}


// ------------------------------------------------------
// 2. Flatten Object
// ------------------------------------------------------

function flattenObject(obj, prefix = "", res = {}) {
  for (let key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], newKey, res);
    } else {
      res[newKey] = obj[key];
    }
  }
  return res;
}


// ------------------------------------------------------
// 3. Group By Property
// ------------------------------------------------------

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const val = item[key];
    acc[val] = acc[val] || [];
    acc[val].push(item);
    return acc;
  }, {});
}


// ------------------------------------------------------
// 4. Sort Array of Objects
// ------------------------------------------------------

arr.sort((a, b) => a.age - b.age);


// ------------------------------------------------------
// 5. Find Frequency of Elements
// ------------------------------------------------------

function frequency(arr) {
  return arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}


// ------------------------------------------------------
// 6. First Non-Repeating Character
// ------------------------------------------------------

function firstUnique(str) {
  const map = {};

  for (let ch of str) map[ch] = (map[ch] || 0) + 1;

  for (let ch of str) {
    if (map[ch] === 1) return ch;
  }

  return null;
}


// ------------------------------------------------------
// 7. Remove Duplicates from Array
// ------------------------------------------------------

const unique = arr => [...new Set(arr)];


// ------------------------------------------------------
// 8. Chunk Array
// ------------------------------------------------------

function chunk(arr, size) {
  let res = [];

  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }

  return res;
}


// ------------------------------------------------------
// 9. Find Missing Number
// ------------------------------------------------------

function missing(arr, n) {
  const total = (n * (n + 1)) / 2;
  const sum = arr.reduce((a, b) => a + b, 0);
  return total - sum;
}


// ------------------------------------------------------
// 10. Deep Clone Object (Circular Safe)
// ------------------------------------------------------

function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (let key in obj) {
    clone[key] = deepClone(obj[key], map);
  }

  return clone;
}


// ------------------------------------------------------
// 11. Merge Two Sorted Arrays
// ------------------------------------------------------

function merge(a, b) {
  let i = 0, j = 0, res = [];

  while (i < a.length && j < b.length) {
    res.push(a[i] < b[j] ? a[i++] : b[j++]);
  }

  return [...res, ...a.slice(i), ...b.slice(j)];
}


// ------------------------------------------------------
// 12. Array Intersection
// ------------------------------------------------------

function intersection(a, b) {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
}


// ------------------------------------------------------
// 13. Convert Array → Object Map
// ------------------------------------------------------

function toMap(arr) {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}


// ------------------------------------------------------
// 14. Reverse Words in Sentence
// ------------------------------------------------------

function reverseWords(str) {
  return str.split(" ").reverse().join(" ");
}


// ------------------------------------------------------
// 15. Debounce Function
// ------------------------------------------------------

function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


// ------------------------------------------------------
// 16. Throttle Function
// ------------------------------------------------------

function throttle(fn, delay) {
  let last = 0;

  return (...args) => {
    const now = Date.now();

    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
}


// ------------------------------------------------------
// 17. Promise.all Polyfill
// ------------------------------------------------------

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let res = [];
    let count = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(val => {
          res[i] = val;
          count++;

          if (count === promises.length) {
            resolve(res);
          }
        })
        .catch(reject);
    });
  });
}


// ------------------------------------------------------
// 18. Currying Function
// ------------------------------------------------------

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...next) => curried(...args, ...next);
  };
}


// ------------------------------------------------------
// 19. Memoization
// ------------------------------------------------------

function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (!cache[key]) {
      cache[key] = fn(...args);
    }

    return cache[key];
  };
}


// ------------------------------------------------------
// 20. Once Function
// ------------------------------------------------------

function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}


// ------------------------------------------------------
// 21. Longest Unique Substring
// ------------------------------------------------------

function longestUnique(str) {
  let map = new Map();
  let left = 0, max = 0;

  for (let right = 0; right < str.length; right++) {
    if (map.has(str[right]) && map.get(str[right]) >= left) {
      left = map.get(str[right]) + 1;
    }

    map.set(str[right], right);
    max = Math.max(max, right - left + 1);
  }

  return max;
}


// ------------------------------------------------------
// 22. map Polyfill
// ------------------------------------------------------

Array.prototype.myMap = function(cb) {
  let res = [];

  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }

  return res;
};


// ------------------------------------------------------
// 23. filter Polyfill
// ------------------------------------------------------

Array.prototype.myFilter = function(cb) {
  let res = [];

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      res.push(this[i]);
    }
  }

  return res;
};


// ------------------------------------------------------
// 24. reduce Polyfill
// ------------------------------------------------------

Array.prototype.myReduce = function(cb, init) {
  let acc = init ?? this[0];
  let start = init ? 0 : 1;

  for (let i = start; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }

  return acc;
};


// ------------------------------------------------------
// 25. call Polyfill
// ------------------------------------------------------

Function.prototype.myCall = function(ctx, ...args) {
  ctx.fn = this;
  const res = ctx.fn(...args);
  delete ctx.fn;
  return res;
};


// ------------------------------------------------------
// 26. apply Polyfill
// ------------------------------------------------------

Function.prototype.myApply = function(ctx, args) {
  ctx.fn = this;
  const res = ctx.fn(...args);
  delete ctx.fn;
  return res;
};


// ------------------------------------------------------
// 27. bind Polyfill
// ------------------------------------------------------

Function.prototype.myBind = function(ctx, ...args) {
  const fn = this;

  return function (...rest) {
    return fn.apply(ctx, [...args, ...rest]);
  };
};