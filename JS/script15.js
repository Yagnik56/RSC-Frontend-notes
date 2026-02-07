// EVENT LOOP – Interview Notes

// --------------------------------------------------
// Why JavaScript is Single-Threaded
//
// JavaScript has a single call stack.
// It can execute only ONE task at a time.
// This avoids race conditions and makes JS predictable.
//
// JS does NOT block for async operations.
// Async work is offloaded to Web APIs (browser / Node),
// and results are handled later via queues.

// --------------------------------------------------
// Synchronous Code (Call Stack)

console.log("1");
console.log("2");
console.log("3");

// Output:
// 1
// 2
// 3

// --------------------------------------------------
// Asynchronous Code (Macrotask / Task Queue)

console.log("1");

setTimeout(function () {
  console.log("2");
}, 0); // goes to Task Queue

console.log("3");

// Output:
// 1
// 3
// 2

// --------------------------------------------------
// Microtask Queue (Promises, fetch.then, queueMicrotask)

Promise.resolve().then(function () {
  console.log("Promise resolved");
});

Promise.reject().catch(function () {
  console.log("Promise rejected");
});

// Microtasks always run BEFORE macrotasks

// --------------------------------------------------
// Task Queue vs Microtask Queue

console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout (task)");
}, 0);

Promise.resolve().then(() => {
  console.log("Inside Promise (microtask)");
});

console.log("End");

// Output:
// Start
// End
// Inside Promise (microtask)
// Inside setTimeout (task)

// --------------------------------------------------
// Event Loop (High-Level Flow)
//
// 1. Execute synchronous code (Call Stack)
// 2. Execute ALL microtasks
// 3. Execute ONE macrotask
// 4. Repeat

// --------------------------------------------------
// Interview Question 1 : What is Event Loop?

/*
The Event Loop is a mechanism that continuously checks:
- Is the Call Stack empty?
- Are there pending Microtasks?
- Are there pending Macrotasks?

It ensures non-blocking asynchronous execution
in a single-threaded JavaScript environment.
*/

/*
  Javascript is single threaded and The event loop is responsible for how its
  asynchronous behavior happens.
  The event loop is like a traffic controller in JavaScript that manages the execution of code.
  It ensures tasks are processed in an orderly manner, handling asynchronous operations
  by continuously checking if there are pending tasks in queues(microtasks and macrotasks). 
*/

// --------------------------------------------------
// Interview Question 2 : Why do we need Event Loop?
//
// Without it, async callbacks would never execute.
// It coordinates execution between:
// - Call Stack
// - Microtask Queue
// - Task (Macrotask) Queue

// --------------------------------------------------
// Interview Question 3 : Output (Blocking main thread)

blockMainThread();

console.log("Start");

function blockMainThread() {
  const start = Date.now();
  while (Date.now() - start < 3000) {} // blocks JS thread
  console.log("running..");
}

console.log("End");

// Output:
// running..
// Start
// End
//
// Blocking code delays EVERYTHING (including async)

// --------------------------------------------------
// Interview Question 4 : Output (setTimeout order)

setTimeout(function a() {
  console.log("a");
}, 1000);

setTimeout(function b() {
  console.log("b");
}, 500);

setTimeout(function c() {
  console.log("c");
}, 0);

function d() {
  console.log("d Runs");
}

d();

// Output:
// d Runs
// c
// b
// a

// --------------------------------------------------
// Interview Question 5 : var vs let in async loops

function usingVar() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i); // 3, 3, 3
    }, i * 1000);
  }
}

function usingLet() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i); // 0, 1, 2
    }, i * 1000);
  }
}

// usingVar();
// usingLet();

// --------------------------------------------------
// Interview Question 6 : Promise + setTimeout mix

Promise.resolve()
  .then(function () {
    Promise.resolve().then(function () {
      console.log("e Runs");
    });

    setTimeout(function () {
      console.log("d Runs");
    }, 0);

    throw new Error("Error Occurred!");
  })
  .catch(function () {
    console.log("b Runs");
  })
  .then(function () {
    console.log("c Runs");
  });

// Output order:
// e Runs
// b Runs
// c Runs
// d Runs

// Explanation:
// - Microtasks first (e)
// - Error goes to catch (b)
// - then after catch (c)
// - setTimeout last (d)

// --------------------------------------------------
// Interview Question 7 : Promise timing

function pause(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, ms);
  });
}

const start = Date.now();
console.log("Start");

pause(1000).then((res) => {
  const end = Date.now();
  const secs = (end - start) / 1000;
  console.log(res, ":", secs);
});

// Output:
// Start
// resolved : ~1s

// ---------------------------------------------------
// Call Stack - pause(1000) p(resolve)
// Task - s()
// MicroTask -

// resolved: 1.3

// If a macrotask is already queued and the microtask does not exist yet (like a slow fetch), the macrotask will execute first. Microtasks do not “preempt” already-running or already-executed macrotasks.
// Microtasks > macrotasks
// Priority applies only at check time
// Future microtasks do NOT delay current macrotasks
// Fetch resolves later → its .then() runs later

// --------------------------------------------------
// IMPORTANT RULES (VERY IMPORTANT FOR INTERVIEWS)
//
// 1. JS executes synchronous code first
// 2. Microtasks are executed BEFORE macrotasks
// 3. All microtasks must complete before moving to next macrotask
// 4. A long synchronous task blocks everything
// 5. Microtasks do NOT interrupt running macrotasks
// 6. Fetch resolves later → its `.then()` runs later

// --------------------------------------------------
// Queue Priority Summary
//
// Call Stack
// ↓
// Microtask Queue (Promise.then, catch, finally)
// ↓
// Macrotask Queue (setTimeout, setInterval, DOM events)
