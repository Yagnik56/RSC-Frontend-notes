// VAR, LET & CONST – Interview Notes

// 3 types of scope: global, function, and block
// var → function scoped (global if declared outside function)
// let & const → block scoped

// --------------------------------------------------
// Question 1 : Variable Shadowing

function test() {
  let a = "Hello";

  if (true) {
    let a = "Hi"; // Shadows outer 'a'
    console.log(a); // Hi
  }

  console.log(a); // Hello
}

test();

// --------------------------------------------------
// Question 2 : Illegal Shadowing

function func() {
  var a = "Hello";
  let b = "Namaste";

  if (true) {
    let a = "Hi"; // Legal shadowing (let shadows var)
    var b = "Bye"; // ❌ Illegal shadowing (var cannot shadow let) in same func scope
    console.log(a);
    console.log(b);
  }

  function inner() {
    var b = "Hola"; // Legal shadowing (function scope allows var to shadow let)

    console.log(a);
  }
}

func();

// Illegal shadowing happens when 'var' tries to redeclare
// a variable declared with let or const in the same scope chain

// --------------------------------------------------
// Question 3 : Hoisting

console.log(a); // undefined
var a = 10;

// 'var' declarations are hoisted and initialized with undefined

// --------------------------------------------------
// Question 4 : Temporal Dead Zone (TDZ)

console.log(a); // undefined
// console.log(b); // ReferenceError (TDZ)
// console.log(c); // ReferenceError (TDZ)

const c = 30;
let b = 20;
var a = 10;

// Question 5: flatten nested array

function flatten(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

flatten([1, [2, [3, 4]], 5]);
// [1, 2, 3, 4, 5]

// --------------------------------------------------
// Key Differences

// var can be redeclared and updated
// let can be updated but not redeclared in the same scope
// const can neither be redeclared nor updated

// --------------------------------------------------
// JavaScript Execution Context

// JS execution context has two phases:

// 1. Creation Phase
// - Global object (window / globalThis) is created
// - Memory is allocated for variables and functions
// - var → initialized with undefined
// - let & const → placed in TDZ (not initialized)
// - Functions → fully hoisted

// 2. Execution Phase
// - Code runs line by line

// --------------------------------------------------
// Temporal Dead Zone (TDZ)

// TDZ is the time between variable memory allocation
// and its initialization where accessing it throws ReferenceError
