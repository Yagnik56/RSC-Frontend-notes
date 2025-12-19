// VAR, LET & CONST Interview Questions

// 3 types of scope global (var), function and block (let, const) scope
// Question 1 : Variable Shadowing

function test() {
  let a = "Hello";

  if (true) {
    let a = "Hello"; // New value assigned
    console.log(a);
  }

  console.log(a);
}

test();

// Question 2 :  Illegal Shadowing

function func() {
  var a = "Hello";
  let b = "Namaste";

  if (true) {
    let a = "Hi"; // Legal Shadowing
    var b = "Bye"; // Illegal Shadowing
    console.log(a); // It will print 'GeeksforGeeks'
    console.log(b); // It will print error
  }
}
test();

// Question 3 : Hoisting

console.log(a);

var a = 10;

// Question 4 : Temporal Dead Zone

console.log(a, b, c);

const c = 30;
let b = 20;
var a = 10;

// var can be redeclared and updated but let and const can't be redeclared and cosnt can't be updated either in same scope.
// JS execution context has two phases : Creation phase and execution phase.
// In a creation phase, 3 things happen : it created a global / window object, it setups the memory space for variables and functions and assign these variables with undefined (only for var) and func are assigned with their whole function body.
// In execution phase, code is executed line by line.
// let and const are stored in a special place in memory called TDZ (temporal dead zone - time between creation and execution phase (they are in scope but not declared yet)) and they are not given default value of undefined. 
