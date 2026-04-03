// CALL, APPLY & BIND – Interview Notes

// --------------------------------------------------
// Question 1 : What is call()?
// call() invokes a function immediately
// and explicitly sets the value of `this`

function sayHello() {
  return "Hello " + this.name;
}

var obj = { name: "Piyush" };
console.log(sayHello.call(obj)); // Hello Piyush

// --------------------------------------------------
// Question 2 : What is apply()?
// Same as call(), but arguments are passed as an array

function sayHello(day) {
  return "Hello " + this.name + " today is " + day;
}

var obj2 = { name: "Piyush" };
console.log(sayHello.apply(obj2, ["Monday"]));

// --------------------------------------------------
// Question 3 : What is bind()?
// bind() returns a new function with `this` bound
// Function is NOT executed immediately

function sayHello2() {
  return "Hello " + this.name;
}

var obj3 = { name: "Piyush" };
const helloFn = sayHello2.bind(obj3);
console.log(helloFn());

// --------------------------------------------------
// Question 4 : Output

const person = { name: "Piyush" };

function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.call(person, 24)); // Piyush is 24
console.log(sayHi.bind(person, 24)); // returns bound function

// --------------------------------------------------
// Question 5 : call() with method borrowing

const age = 10;

var personA = {
  name: "Piyush",
  age: 20,
  getAge() {
    return this.age;
  },
};

var personB = { age: 24 };

console.log(personA.getAge.call(personB)); // 24

// --------------------------------------------------
// Question 6 : Output

var status = "😎";

setTimeout(() => {
  const status = "😍";

  const data = {
    status: "🥑",
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus()); // 🥑
  console.log(data.getStatus.call(this)); // 😎
}, 0);

// --------------------------------------------------
// Question 7 : Print animals using call()

const animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Queen" },
];

function printAnimals(i) {
  this.print = function () {
    console.log(`#${i} ${this.species}: ${this.name}`);
  };
  this.print();
}

for (let i = 0; i < animals.length; i++) {
  printAnimals.call(animals[i], i);
}

// --------------------------------------------------
// Question 8 : apply() to append array

const array = ["a", "b"];
const elements = [0, 1, 2];

array.push.apply(array, elements);
console.log(array);

// --------------------------------------------------
// Question 9 : apply() with built-in functions

const numbers = [5, 6, 2, 3, 7];
console.log(Math.max.apply(null, numbers)); // 7

// --------------------------------------------------
// Question 10 : Bound function explanation

function f() {
  console.log(this);
}

let userX = {
  g: f.bind(null), // this permanently bound to null (global object)
};

userX.g();

// --------------------------------------------------
// Question 11 : Bind chaining
// Once bound, it cannot be re-bound

function f2() {
  console.log(this.name);
}

f2 = f2.bind({ name: "John" }).bind({ name: "Ann" });
f2(); // John

// --------------------------------------------------
// Question 12 : Fix the code using bind()

function checkPassword(success, failed) {
  let password = prompt("Password?", "");
  if (password == "Roadside Coder") success();
  else failed();
}

let userY = {
  name: "Piyush Agarwal",

  loginSuccessful() {
    console.log(`${this.name} logged in`);
  },

  loginFailed() {
    console.log(`${this.name} failed to log in`);
  },
};

checkPassword(userY.loginSuccessful.bind(userY), userY.loginFailed.bind(userY));

// --------------------------------------------------
// Question 13 : Partial application using bind()

function checkPassword2(ok, fail) {
  let password = prompt("Password?", "");
  if (password == "Roadside Coder") ok();
  else fail();
}

let userZ = {
  name: "Piyush Agarwal",
  login(result) {
    console.log(this.name + (result ? " login successful" : " login failed"));
  },
};

checkPassword2(userZ.login.bind(userZ, true), userZ.login.bind(userZ, false));

// --------------------------------------------------
// Question 14 : Explicit binding with Arrow Function

const age2 = 10;

var personC = {
  name: "Piyush",
  age2: 20,

  // Arrow function → does NOT have its own `this`
  // `this` is taken from the surrounding (global/module) scope
  getAgeArrow: () => console.log(this.age2),

  // Normal function → `this` is decided at call time
  getAge() {
    console.log(this.age2);
  },
};

var personD = { age2: 24 };

personC.getAgeArrow.call(personD);
// ❌ undefined
// Reason:
// - Arrow functions ignore call/apply/bind
// - `this` is lexically bound at definition time
// - `const age2 = 10` is NOT attached to global `this`
// - So `this.age2` → undefined
// - if we had `var age2 = 10` output would be 10

personC.getAge.call(personD);
// ✅ 24
// Reason:
// - Normal function has its own `this`
// - call(personD) explicitly binds `this` to personD
// - this.age2 → personD.age2 → 24

// --------------------------------------------------
// Question 15 : call() Polyfill

let car1 = {
  color: "Red",
  company: "Ferrari",
};

let car2 = {
  color: "Blue",
  company: "BMW",
};

let car3 = {
  color: "White",
  company: "Mercedes",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price} `
  );
}

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error("Not callable");
  }

  context.fn = this;
  return context.fn(...args);
};
purchaseCar.myCall(car3, "₹", "60,00,000");
// --------------------------------------------------
// Question 16 : apply() Polyfill

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error("Not callable");
  }

  if (!Array.isArray(args)) {
    throw new TypeError("Arguments must be an array");
  }

  context.fn = this;
  return context.fn(...args);
};
purchaseCar.myApply(car2, ["₹", "50,00,000"]);

// --------------------------------------------------
// Question 17 : bind() Polyfill

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error("Cannot bind non-function");
  }

  const fn = this; // (context.fn = this;)

  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]); //(or context.fn(...args, ...newArgs);)
  };
};

const initPurchaseBmw = purchaseCar.myBind(car1, "₹", "1,00,00,000");
initPurchaseBmw();

// --------------------------------------------------
// Implicit vs Explicit Binding

// Implicit binding:
// Determined by object before the dot
// obj.method() → this === obj

// Explicit binding:
// Manually setting `this`
// call(), apply(), bind()
