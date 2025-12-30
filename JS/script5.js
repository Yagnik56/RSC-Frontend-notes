// CURRYING – Interview Notes

// --------------------------------------------------
// Question 1 : Currying
// Currying is the technique of transforming a function
// with multiple arguments into a sequence of functions
// each taking a single argument.
//
// f(a, b)  →  f(a)(b)

function f(a) {
  return (b) => {
    return "Works";
  };
}

console.log(f(1)(2));

// --------------------------------------------------
// Question 2 : sum(1)(2)(3)

function sum(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}

console.log(sum(1)(2)(3)); // 6

// --------------------------------------------------
// Question 3 : Write a currying function
// evaluate("sum")(4)(2)
// evaluate("multiply")(4)(2)
// evaluate("divide")(4)(2)
// evaluate("subtract")(4)(2)

function evaluate(operation) {
  return function (a) {
    return function (b) {
      if (operation === "sum") return a + b;
      else if (operation === "multiply") return a * b;
      else if (operation === "divide") return a / b;
      else if (operation === "subtract") return a - b;
      else return "Invalid Operation!";
    };
  };
}

console.log(evaluate("sum")(4)(2));
console.log(evaluate("multiply")(4)(2));
console.log(evaluate("divide")(4)(2));
console.log(evaluate("subtract")(4)(2));
console.log(evaluate("substr")(4)(2)); // Invalid Operation!

// --------------------------------------------------
// Question 4 : Infinite Currying
// sum(1)(2)(3)...(n)
//
// The chain stops when no argument is passed

function add(a) {
  return function (b) {
    if (b !== undefined) return add(a + b);
    return a;
  };
}

console.log(add(5)(2)(4)(8)()); // 19

// --------------------------------------------------
// Question 5 : Currying vs Partial Application

// Currying:
// Transforms a function into multiple functions
// each accepting a single argument
// f(a, b, c) → f(a)(b)(c)

// Partial Application:
// Fixes some arguments and returns a function
// that takes the remaining arguments

// Example (Partial Application):
function multiply(a) {
  return (b, c) => a * b * c;
}

let x = multiply(10);
console.log(x(3, 12));
console.log(x(20, 12));

// --------------------------------------------------
// Question 6 : Real-world example of Currying
// DOM manipulation

// First function fixes the element
// Second function updates the content

const updateElemText = (id) => (content) =>
  (document.querySelector(`#${id}`).textContent = content);

const updateHeaderText = updateElemText("header");
updateHeaderText("Subscribe to RoadsideCoder!");

// --------------------------------------------------
// Question 7 : curry() implementation
// Converts a normal function into a curried function

function curry(func) {
  return function curriedFunc(...args) {
    // func.length → number of parameters expected by original function
    if (args.length >= func.length) {
      // enough arguments → execute function
      return func(...args);
    } else {
      // not enough arguments → return a function
      return function (...nextArgs) {
        return curriedFunc(...args, ...nextArgs);
      };
    }
  };
}

const sumCurry = (a, b, c) => a + b + c;

const totalSum = curry(sumCurry);

console.log(totalSum(1)(6)(5)); // 12
console.log(totalSum(1, 6)(5)); // 12
console.log(totalSum(1)(6, 5)); // 12
