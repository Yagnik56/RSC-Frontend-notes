// CLOSURE – Interview Notes

// --------------------------------------------------
// Question 1 : Lexical Scope
// Lexical scope means a function can access variables
// defined in its outer (parent) scope.

// Global scope
function local() {
  // Local scope
  var username = "Roadsidecoder";
  console.log(username);
}
local();

// --------------------------------------------------
// Question 2 : Closure
// A closure is created when a function remembers
// its lexical scope even when executed outside it.

function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();

// --------------------------------------------------
// Question 3 : Closure Scope Chain

const e = 10;

function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20

// --------------------------------------------------
// Question 4 : Output based question

let count = 0;

(function printCount() {
  if (count === 0) {
    let count = 1; // block scoped
    console.log(count); // 1
  }
  console.log(count); // 0
})();

// --------------------------------------------------
// Question 5 : Write function for addSix()

function createBase(num) {
  return function (innerNum) {
    console.log(innerNum + num);
  };
}

var addSix = createBase(6);
addSix(10); // 16
addSix(21); // 27

// --------------------------------------------------
// Question 6 : Time Optimization using Closure

function find() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]);
  };
}

const closure = find();

console.time("6");
closure(6);
console.timeEnd("6");

console.time("50");
closure(50);
console.timeEnd("50");

// --------------------------------------------------
// Question 7 : Block scope & setTimeout

// Using let (block scoped)
function a() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i); // 0, 1, 2
    }, i * 1000);
  }
}
a();

// Using var (function scoped) with closure fix
for (var i = 0; i < 3; i++) {
  function inner(i) {
    setTimeout(function () {
      console.log(i); // 0, 1, 2
    }, i * 1000);
  }
  inner(i);
}

// --------------------------------------------------
// Question 8 : Private Counter using Closure

function counter() {
  var _counter = 0;

  function add(increment) {
    _counter += increment;
  }

  function retrieve() {
    return "Counter = " + _counter;
  }

  return {
    add,
    retrieve,
  };
}

const c = counter();
c.add(5);
c.add(10);
console.log(c.retrieve());

// --------------------------------------------------
// Question 9 : Module Pattern

// Module pattern uses IIFE and closure
// to create private variables and methods

var module = (function () {
  function privateMethod() {
    console.log("private");
  }

  return {
    publicMethod: function () {
      console.log("public");
    },
  };
})();

module.publicMethod();
// module.privateMethod(); // ❌ Not accessible

// --------------------------------------------------
// Question 10 : Make a function run only once

let view;

function Like() {
  let called = 0;

  return function () {
    if (called > 0) {
      console.log("Already");
    } else {
      view = "Roadsidecoder";
      console.log("Subscribe", view);
      called++;
    }
  };
}

let isSub = Like();
isSub();
isSub();
isSub();

// --------------------------------------------------
// Question 11 : once() Polyfill
// Ensures a function can be executed only once
// After the first execution, further calls return the same result

function once(func, context) {
  let ran; // stores the result of the function

  return function () {
    // func exists only for the first call
    if (func) {
      // apply() is used to preserve context and arguments
      ran = func.apply(context || this, arguments);
      func = null; // clearing reference ensures it runs only once
    }
    return ran; // return stored result on subsequent calls
  };
}

const hello = once((a, b) => {
  console.log("Hi", a, b);
});

hello(1, 2); // executes
hello(1, 2); // ignored
hello(1, 2);

// --------------------------------------------------
// Question 12 : Memoize Polyfill
// Memoization is an optimization technique
// It caches the result of expensive function calls
// and returns the cached result when the same inputs occur again

function myMemoize(fn, context) {
  const cache = {}; // stores results based on arguments

  return function (...args) {
    // arguments are converted to a string to create a unique cache key
    const argsCache = JSON.stringify(args);

    // if result not cached, compute and store it
    if (!cache[argsCache]) {
      cache[argsCache] = fn.call(context || this, ...args);
    }

    // return cached result
    return cache[argsCache];
  };
}

const clumsyProduct = (num1, num2) => {
  // simulating an expensive operation
  for (let i = 1; i <= 100000000; i++) {}
  return num1 * num2;
};

const MemoizeClumsyProduct = myMemoize(clumsyProduct);

console.time("First call");
console.log(MemoizeClumsyProduct(9467, 7649)); // slow
console.timeEnd("First call");

console.time("Second call");
console.log(MemoizeClumsyProduct(9467, 7649)); // fast (cached)
console.timeEnd("Second call");

// --------------------------------------------------
// Question 13 : Closure vs Scope

// Scope:
// Determines where variables are accessible
// (global, function, block)

// Closure:
// When an inner function remembers and accesses
// variables from its outer function even after
// the outer function has finished execution
