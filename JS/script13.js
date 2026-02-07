// PROTOTYPE – Interview Notes
// In JavaScript, almost everything is an object
// Objects inherit properties and methods via prototypes

// --------------------------------------------------
// Basic Prototype Examples

let obj = {
  name: "Piyush Agarwal",
  age: 25,
};

// obj.__proto__ → Object.prototype

let num = 10.3;
// num.__proto__ → Number.prototype
// num.__proto__.__proto__ → Object.prototype

let str = "RoadsideCoder";
// str.__proto__ → String.prototype

let bool = true;
// bool.__proto__ → Boolean.prototype

function add(a, b) {
  return a + b;
}

// add.__proto__ → Function.prototype
// add.__proto__.__proto__ → Object.prototype

// --------------------------------------------------
// Prototype Chaining
// When a property is not found on the object itself,
// JavaScript looks for it in its prototype chain

let person = {
  name: "Piyush Agarwal",
  age: 25,
};

// Example (commented for clarity):
// let additional = {
//   name: "Piyush",
//   username: "RoadsideCoder",
//   alias() {
//     console.log(`${this.name} is also known as ${this.username}`);
//   },
// };

// person.__proto__ = additional;
// console.log(person.alias());

// --------------------------------------------------
// Prototype Inheritance using Constructor Functions

// Constructor function
function Animal(name) {
  this.name = name;
}

// Method added to prototype
Animal.prototype.sayName = function () {
  console.log("My name is " + this.name);
};

var animal1 = new Animal("Tiger");

// Child constructor
function Dog(name, breed) {
  Animal.call(this, name); // inherit properties
  this.breed = breed;
}

// Inherit methods
Dog.prototype = Object.create(Animal.prototype);

// Fix constructor reference
Dog.prototype.constructor = Dog;

// Add child-specific method
Dog.prototype.bark = function () {
  console.log("Woof!");
};

var dog1 = new Dog("Max", "Labrador");

// --------------------------------------------------
// Extending Built-in Prototypes (Be careful in real projects)

Array.prototype.myArr = function () {
  console.log("This is my array " + this);
};

const arr = [1, 2, 3];
console.log(arr.myArr());

// --------------------------------------------------
// ----------- Interview Questions on Prototypes -----------

// Q1: Method overriding via prototype chain output?

// function Vehicle() {}
// Vehicle.prototype.drive = function () {
//   console.log("Driving a vehicle");
// };

// function Car() {}
// Car.prototype = Object.create(Vehicle.prototype);
// Car.prototype.constructor = Car;
// Car.prototype.drive = function () {
//   console.log("Driving a car");
// };

// var vehicle = new Vehicle();
// var car = new Car();

// vehicle.drive(); // Driving a vehicle
// car.drive();     // Driving a car

// --------------------------------------------------
// Q2: Difference between __proto__ and prototype

// - **`__proto__`**: It is an object property that points to the prototype of the object.
//                    It is used for inheritance and allows accessing the prototype chain.
// - Exists on every JavaScript object
// - Points to the object's internal prototype
// - Used during property lookup

// - **`prototype`**: It is a property that exists on constructor functions and is used to
//                   set up inheritance for objects created by that constructor function.
//   It defines properties and methods shared by all instances created by that constructor function.
// - Exists only on constructor functions
// - Used to define properties/methods shared by instances

// obj.__proto__ === Constructor.prototype

// --------------------------------------------------
// Q3: What is Object.setPrototypeOf?

var animalPrototype = {
  sound() {
    console.log("Making a sound...");
  },
};

var dog = Object.create(animalPrototype);

var cat = {
  purr() {
    console.log("Purring...");
  },
};

// Changes prototype at runtime (slow, avoid in production)
Object.setPrototypeOf(dog, cat);
dog.purr(); // Purring...

// --------------------------------------------------
// Q4: What is instanceof?

// instanceof checks whether Constructor.prototype
// exists in the object's prototype chain

console.log(dog1 instanceof Dog);    // true
console.log(dog1 instanceof Animal); // true
console.log(dog1 instanceof Object); // true

// --------------------------------------------------
// Q5: Create object without prototype

var objNoProto = Object.create(null);
// No prototype methods available
// objNoProto.toString → undefined

// --------------------------------------------------
// Q6: Prototype chain resolution output

function A() {}
A.prototype.foo = 10;

function B() {}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.foo = 20;

function C() {}
C.prototype = Object.create(B.prototype);
C.prototype.constructor = C;
C.prototype.foo = 30;

var obj1 = new A();
var obj2 = new B();
var obj3 = new C();

console.log(obj1.foo); // 10
console.log(obj2.foo); // 20
console.log(obj3.foo); // 30

// --------------------------------------------------
// Q7: Deep Clone using recursion (Prototype-safe)

// Handles nested objects & arrays
function deepClone(obj) {
  // Primitive or null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Create a new object or array based on the type of the input object
  var clone = Array.isArray(obj) ? [] : {};

  // Iterate through each key in the input object
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

var obj2 = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
};

var clonedObj = deepClone(obj2);
clonedObj.b.c = 3;

console.log(obj2.b.c); // 2 (original unchanged)
