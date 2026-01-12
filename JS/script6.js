// OBJECT – Interview Notes
// How to access, modify, and delete object properties

// --------------------------------------------------
// Question 1 : delete keyword in Object

const func = (function (a) {
  delete a; // delete works only on object properties, not local variables
  return a;
})(5);

console.log(func); // 5

// --------------------------------------------------
// Access key with space in object

const user1 = {
  name: "Yagnik",
  age: 24,
  "likes js": true,
};

console.log(user1["likes js"]); // bracket notation required

// --------------------------------------------------
// How to add dynamic key in object

let key = "email";
let userMail = "abc@gmail.com";

const userDetails = {
  [key]: userMail, // computed property
};

console.log(userDetails);

// --------------------------------------------------
// Computed Properties

let property = "firstName";
let nameValue = "Piyush Agarwal";

let person1 = {
  [property]: nameValue,
};

// Accessing
console.log(person1.firstName);
console.log(person1[property]);

// --------------------------------------------------
// Looping through object keys (for...in)

let user2 = {
  name: "Piyush",
  age: 24,
};

for (let key in user2) {
  console.log(key); // name, age
  console.log(user2[key]); // values
}

// --------------------------------------------------
// Question 2 : Output

const obj = { a: "one", b: "two", a: "three" };
console.log(obj);
// { a: 'three', b: 'two' }
// Last duplicate key overwrites previous ones

// --------------------------------------------------
// Question 3 : Multiply numeric values by 2

let nums = {
  a: 100,
  b: 200,
  title: "My nums",
};

multiplyByTwo(nums);

function multiplyByTwo(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2;
    }
  }
}

console.log(nums);

// --------------------------------------------------
// Question 4 : Output (Important)

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]); // 456
// Objects used as keys are converted to "[object Object]"

// --------------------------------------------------
// Question 5 : JSON.stringify & JSON.parse

const userOne = {
  name: "piyush",
  age: 87,
};

const strObj = JSON.stringify(userOne);
console.log(JSON.parse(strObj));
// Used for deep cloning (with limitations)

// --------------------------------------------------
// Question 6 : Output

console.log([..."Lydia"]); // ['L','y','d','i','a']

// --------------------------------------------------
// Question 7 : Spread operator with object

const user3 = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user3 };

console.log(admin);

// --------------------------------------------------
// Question 8 : JSON.stringify with replacer array

const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90,
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data); // {"level":19,"health":90}

// --------------------------------------------------
// Question 9 : Output (this keyword)

const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter()); // 20
console.log(shape.perimeter()); // NaN (arrow function has no own this)

// --------------------------------------------------
// Question 10 : Object Destructuring

let user4 = {
  name: "Piyush",
  age: 24,
  fullName: {
    firstName: "Piyush",
    lastName: "Agarwal",
  },
};

const {
  fullName: { firstName },
} = user4;
console.log(firstName);

// --------------------------------------------------
// Question 11 : Output (Invalid syntax)

function getItems(fruitList, ...args) {
  return [...fruitList, ...args];
}

// Rest parameter must be last
console.log(getItems(["banana", "apple"], "pear", "orange"));

// --------------------------------------------------
// Question 12 : Output (Reference)

let c1 = { greeting: "Hey!" };
let d1;

d1 = c1;
c1.greeting = "Hello";

console.log(d1.greeting); // Hello

// --------------------------------------------------
// Question 13 : Output (Object comparison)

console.log({ a: 1 } == { a: 1 }); // false
console.log({ a: 1 } === { a: 1 }); // false
// Objects are compared by reference, not value

// --------------------------------------------------
// Question 14 : Output

let person2 = { name: "Lydia" };
const members = [person2];
person2 = null;

console.log(members);
// Reference inside array remains intact

// --------------------------------------------------
// Question 15 : Output (Default parameter + mutation)

const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply(); // 20
multiply(); // 20
multiply(value); // 20
multiply(value); // 40

// --------------------------------------------------

// Question 16 : Output (Reference vs Reassignment)

function changeAgeAndReference(person) {
  person.age = 25; // mutates original object

  person = {
    name: "John",
    age: 50,
  };

  return person;
}

const personObj1 = {
  name: "Alex",
  age: 30,
};

const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // { name: 'Alex', age: 25 }
console.log(personObj2); // { name: 'John', age: 50 }

// --------------------------------------------------
// Question 17 : Shallow Copy vs Deep Copy

const objOriginal = { a: 1, b: 2 };

// Shallow copies
const clone1 = Object.assign({}, objOriginal);
const clone2 = { ...objOriginal };

// Deep copy (limitations: no functions, dates, undefined)
// Method 1 : Using JSON (limitations: no functions, undefined, Date, Map, Set)
const deepClone1 = JSON.parse(JSON.stringify(objOriginal));

// Method 2 : structuredClone (recommended, modern browsers / Node 17+)
const deepClone2 = structuredClone(objOriginal);

// Method 3 : Using lodash (deep clone utility)
// const deepClone3 = _.cloneDeep(objOriginal);
