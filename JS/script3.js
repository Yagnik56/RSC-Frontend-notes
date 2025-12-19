// FUNCTION – Interview Notes

// --------------------------------------------------
// Function declaration / definition / statement
// Declared using the `function` keyword
// Function declarations are hoisted

// Function expression
// Assigned to a variable
// Function expressions are NOT hoisted
// The function used in expression is usually anonymous

// --------------------------------------------------
// First-class functions
// Functions are treated as first-class citizens:
// - Can be assigned to variables
// - Passed as arguments
// - Returned from other functions

// --------------------------------------------------
// Question 1 : Function Code

function square(num) {
  return num * num;
}

function displaySquare(fn) {
  console.log("Square is " + fn(5)); // function passed as argument
}

displaySquare(square);

// --------------------------------------------------
// Question 2 : IIFE (Immediately Invoked Function Expression)

// Example 1
(function square(num) {
  console.log(num * num);
})(7);

// Example 2
(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1);

// --------------------------------------------------
// Question 3 : Closure

function init() {
  var name = "Mozilla"; // local variable
  function displayName() {
    // inner function forms a closure
    console.log(name); // accesses parent scope variable
  }
  displayName();
}
init();

// --------------------------------------------------
// Question 4 : Function Scope

// Q1
var num1 = 20,
  num2 = 3,
  name = "Roadsidecoder";

function mul() {
  return num1 * num2;
}
mul();

function getScore() {
  var num1 = 3,
    num2 = 4;

  function add() {
    return name + " scored " + (num1 + num2);
  }
  return add();
}
getScore();

// Q2 - var scope with setTimeout
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i); // prints 5 five times
  }, i * 1000);
}

// --------------------------------------------------
// Question 5 : Function Hoisting

// Function declaration is hoisted
functionName();

function functionName() {
  console.log("work at tech");
}

// Function expression is NOT hoisted
var fun = function () {
  console.log("function expression");
};
// fun();

// Output based question
var x = 21;
var fun2 = function () {
  console.log(x);
  var x = 20;
};
fun2(); // undefined (due to hoisting of local x)

// --------------------------------------------------
// Question 6 : Parameters vs Arguments

// Parameters → variables in function definition
// Arguments → values passed while calling function

const fn = (a, x, y, ...numbers) => {
  console.log(x, y);
};

fn(5, 6, 7, 8);

// --------------------------------------------------
// Question 7 : Spread & Rest Operator

function multiply(...nums) { // Rest operator (must be last)
  console.log(nums[0] * nums[1]);
}

var arr = [5, 7];
multiply(...arr); // Spread operator

// --------------------------------------------------
// Question 8 : Callback Function

function greeting(name) {
  console.log("Hello " + name);
}

function processUserInput(callback) {
  var name = "Yagnik";
  callback(name);
}

processUserInput(greeting);

// --------------------------------------------------
// Question 9 : Arrow Functions

const add = (firstNum, secondNum) => {
  return firstNum + secondNum;
};

const addNum = (firstNum, secondNum) => firstNum + secondNum;

// --------------------------------------------------
// Question 10 : `this` keyword

let user = {
  name: "Roadside Coder",
  rc1: () => {
    console.log("Subscribe to " + this.name); // undefined
  },
  rc2() {
    console.log("Subscribe to " + this.name); // Roadside Coder
  },
};

// --------------------------------------------------
// Function vs Arrow Function

// 1. Syntax difference
// 2. Arrow functions have implicit return
// 3. `arguments` keyword is NOT available in arrow functions
// 4. Arrow functions do NOT have their own `this`
//    → they take `this` from lexical (parent) scope
