// THIS KEYWORD – Interview Notes

// --------------------------------------------------
// Question 1 : this keyword (Global context)

// In browsers, `this` refers to the global object (window)
// In Node.js, `this` at top level is an empty object

let a = 5;
console.log(this.a);
// Browser → undefined (because let does not attach to window)
// var a = 5 would make this.a === 5

// --------------------------------------------------
// Question 2 : this inside Method

let user1 = {
  name: "Piyush",
  age: 24,
  getDetails() {
    // `this` refers to the object calling the method
    console.log(this.name);
  },
};

user1.getDetails(); // Piyush

// --------------------------------------------------
// Question 3 : this inside nested object

let user2 = {
  name: "Piyush",
  age: 24,
  childObj: {
    newName: "Roadside Coder",
    getDetails() {
      // `this` refers to childObj, not parent
      console.log(this.newName, "and", this.name);
    },
  },
};

user2.childObj.getDetails();
// Roadside Coder and undefined

// --------------------------------------------------
// Question 4 : this with Class & Constructor

class User {
  constructor(n) {
    this.name = n; // `this` refers to the new instance
  }

  getName() {
    console.log(this.name);
  }
}

const userObj = new User("Piyush");
userObj.getName(); // Piyush

// --------------------------------------------------
// Question 5 : Output

const user3 = {
  firstName: "Piyush!",
  getName() {
    const firstName = "Local Name";
    return this.firstName; // object property, not local variable
  },
};

console.log(user3.getName()); // Piyush!

// --------------------------------------------------
// Question 6 : What is the result of accessing ref? Why?

function makeUser() {
  return {
    name: "John",
    ref: this, // `this` refers to global object here
  };
}

let user4 = makeUser();
console.log(user4.ref.name);
// undefined (or window.name if set)

// Fix:
function makeUserFixed() {
  return {
    name: "John",
    ref() {
      return this;
    },
  };
}
console.log(makeUserFixed().ref().name); // John

// --------------------------------------------------
// Question 7 : this lost in callback

const user5 = {
  name: "Piyush Agarwal",
  logMessage() {
    console.log(this.name);
  },
};

setTimeout(user5.logMessage, 1000);
// undefined (this lost)

// Fix using bind
setTimeout(user5.logMessage.bind(user5), 1000);

// --------------------------------------------------
// Question 8 : Arrow function vs normal method

const user6 = {
  name: "Piyush",
  greet() {
    return `Hello, ${this.name}!`; // works
  },
  farewell: () => {
    return `Goodbye, ${this.name}!`; // arrow has no own this
  },
};

console.log(user6.greet()); // Hello, Piyush!
console.log(user6.farewell()); // Goodbye, undefined!

// --------------------------------------------------
// Question 9 : Calculator object using this

let calculator = {
  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },

  read() {
    this.a = 5;
    this.b = 10;
  },
};

calculator.read();
console.log(calculator.sum()); // 15
console.log(calculator.mul()); // 50

// --------------------------------------------------
// Question 10 : Output

var length = 4;

function callback() {
  console.log(this.length);
}

const object = {
  length: 5,
  method(callback) {
    callback(); // normal function call → global this
  },
};

object.method(callback); // 4

// --------------------------------------------------
// Question 11 : Method chaining using this

const calc = {
  total: 0,

  add(a) {
    this.total += a;
    return this; // enables chaining
  },

  subtract(a) {
    this.total -= a;
    return this;
  },

  multiply(a) {
    this.total *= a;
    return this;
  },
};

const result = calc.add(10).multiply(5).subtract(30).add(10);
console.log(result.total); // 30
