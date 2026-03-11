// VAR, LET & CONST – Interview Notes

// What is Scope?

// Scope in JavaScript determines where a variable or function
// is accessible in the code.

// It defines the lifetime and visibility of variables.

// Think of scope as:
// "Where can I use this variable?"
// "Where does it live?"


// --------------------------------------------------
// Types of Scope in JavaScript
// --------------------------------------------------

// 1. Global Scope

// Variables declared outside any function or block.
// Accessible from anywhere in the program.

var globalVar = "I am global";

function testGlobal() {
  console.log(globalVar); // ✅ accessible
}

testGlobal();
console.log(globalVar); // ✅ accessible



// --------------------------------------------------
// 2. Function Scope
// --------------------------------------------------

// Variables declared inside a function are accessible
// only within that function.

function example() {
  var x = 10;
  console.log(x); // ✅ 10
}

example();
// console.log(x); ❌ ReferenceError

// In JavaScript, functions create their own scope.


// --------------------------------------------------
// 3. Block Scope (ES6)
// --------------------------------------------------

// Variables declared with let or const inside { }
// exist only within that block.

if (true) {
  let a = 5;
  const b = 10;
  var c = 15;

  console.log(a, b, c); // ✅ 5, 10, 15
}

console.log(c); // ✅ var leaks outside block
// console.log(a); ❌ ReferenceError
// console.log(b); ❌ ReferenceError

// var → function scoped
// let & const → block scoped


// --------------------------------------------------
// 4. Lexical Scope (Static Scope)
// --------------------------------------------------

// Inner functions can access variables from
// their parent scope.

function outer() {
  let outerVar = "I am from outer scope";

  function inner() {
    console.log(outerVar); // ✅ accessible
  }

  inner();
}

outer();


// --------------------------------------------------
// 5. Module Scope (ES6 Modules)
// --------------------------------------------------

// Variables declared in a module file are scoped
// to that module unless exported.

// file1.js
const secret = "hidden";
export const name = "Yash";

// file2.js
// import { name } from "./file1.js";
// console.log(name); // ✅
// console.log(secret); // ❌


// --------------------------------------------------
// Scope Chain
// --------------------------------------------------

// When accessing a variable, JavaScript searches:

// 1. Current scope
// 2. Parent scope
// 3. Global scope

var globalValue = "global";

function outerScope() {
  let outerValue = "outer";

  function innerScope() {
    let innerValue = "inner";

    console.log(innerValue); // inner
    console.log(outerValue); // outer
    console.log(globalValue); // global
  }

  innerScope();
}

outerScope();

// --------------------------------------------------
// Key Scope Takeaways
// --------------------------------------------------

// Global Scope → accessible everywhere
// Function Scope → variables live inside function
// Block Scope → let & const live inside {}
// Lexical Scope → child functions access parent variables
// Scope Chain → JS searches outward until variable found

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

// hoisting
// What is Hoisting in JavaScript?

// Hoisting is JavaScript’s default behaviour of moving declarations (not initializations) to the top of their scope before the code is executed.
// In simple terms:
// Variables and functions are “hoisted” (lifted) to the top of their scope (global or function).
// Only declarations are hoisted, not assignments (values).

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
