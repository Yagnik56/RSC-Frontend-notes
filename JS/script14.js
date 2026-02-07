// CLASS & CONSTRUCTORS – Interview Notes

// --------------------------------------------------
// What is a Class?
// A class is a blueprint for creating objects.
// It defines properties and methods that objects will have.

// --------------------------------------------------
// Creating a Class

class Teacher {
  constructor(name, channel, likes = 0) {
    // constructor runs automatically when object is created
    this.name = name;
    this.channel = channel;
    this.videoLikes = likes;
  }

  intro() {
    // methods defined in class go on the prototype
    return `Hey, it's ${this.name}! Welcome to ${this.channel}`;
  }

  like() {
    this.videoLikes++;
    return `Liked this video! Current likes: ${this.videoLikes}`;
  }
}

const roadsidecoder = new Teacher("Piyush", "RoadsideCoder");

// --------------------------------------------------
// Converting Class to Function Constructor
// (Classes are syntactic sugar over prototypes)

function TeacherFn(name, channel, likes = 0) {
  this.name = name;
  this.channel = channel;
  this.videoLikes = likes;
}

TeacherFn.prototype.intro = function () {
  return `Hey, it's ${this.name}! Welcome to ${this.channel}`;
};

TeacherFn.prototype.like = function () {
  this.videoLikes++;
  return `Liked this video! Current likes: ${this.videoLikes}`;
};

const teacher2 = new TeacherFn("Piyush", "RoadsideCoder");

// --------------------------------------------------
// Inheritance using classes

class YouTubeTeacher extends Teacher {
  constructor(name, channel, likes, subscribers) {
    super(name, channel, likes); // calls parent constructor
    this.subscribers = subscribers;
  }

  subscribersCount() {
    return `${this.channel} has ${this.subscribers} subscribers`;
  }

  // static methods belong to the class, not instances
  static paidCourse() {
    return new YouTubeTeacher("Piyush", "RoadsideCoder", 69, "90k");
  }
}

const ytTeacher = YouTubeTeacher.paidCourse();

// --------------------------------------------------
// ----------- Interview Questions -----------

// Question 1 : Class vs Object
// Class → blueprint
// Object → instance created from class

// --------------------------------------------------
// Question 2 : Output

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const square = new Rectangle(5, 5);
const rect = new Rectangle(4, 6);

console.log(square.area()); // 25
console.log(rect.area());   // 24

// --------------------------------------------------
// Question 3 : How does inheritance work in JS?
// Using `extends` keyword
// Child class inherits properties and methods of parent
// `super()` is used to call parent constructor

// --------------------------------------------------
// Question 4 : Output (Important)

class Employee {
  constructor() {
    this.name = "John";
  }

  // ❌ Invalid – classes can have only ONE constructor
  // constructor() {
  //   this.age = 30;
  // }
}

// Uncaught SyntaxError: A class may only have one constructor

// --------------------------------------------------
// Question 5 : Which approach is better?

// Object literal
const jamesbond = {
  firstName: "Roadside",
  lastName: "Coder",
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`.trim();
  },
};

jamesbond.getFullName();

// Class + prototype approach
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`.trim();
};

const jamesBond = new Person("Roadside", "Coder");
jamesBond.getFullName();

// ✅ Better approach:
// Second approach is better since in the first approach, a closure is maintained
// Second approach is better since in the first approach, a closure is maintained
// for each copy of the object containing getFullName method.While in the second approach,
// the method is registered in the prototype rather than in every object.
// Thus, it is a more memory efficient approach.

// --------------------------------------------------
// Methods live on prototype, not recreated per object
// More memory efficient and scalable

// --------------------------------------------------
// Question 6 : Method Chaining using Class

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
    return this; // enables chaining
  }

  subtract(num) {
    this.result -= num;
    return this;
  }

  multiply(num) {
    this.result *= num;
    return this;
  }

  divide(num) {
    if (num === 0) {
      console.log("Cannot divide by 0");
    } else {
      this.result /= num;
    }
    return this;
  }

  getResult() {
    return this.result;
  }
}

const calc = new Calculator();
const result = calc.add(10).subtract(5).multiply(2).divide(4).getResult();
console.log(result); // 2.5

// --------------------------------------------------
// Question 7 : Inheritance & Polymorphism
// Implement a `Shape` class with an `area()` method.
// Create subclasses `Circle` and `Square` that inherit from `Shape` and override the
// `area()` method to calculate their respective areas.

class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2; // overridden method
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }

  area() {
    return this.side ** 2; // overridden method
  }
}

const circle = new Circle(5);
const square2 = new Square(4);

console.log(circle.area());
console.log(square2.area());

// --------------------------------------------------
// Question 8 : Getters and Setters

// Used to control access to object properties
// Helpful for validation and encapsulation

class TeacherWithAccessors {
  constructor(name, channel) {
    this.name = name;
    this.channel = channel;
    this._videoLikes = 0; // convention for private variable
  }

  intro() {
    return `Hey, it's ${this.name}! Welcome to ${this.channel}!`;
  }

  like() {
    this._videoLikes++;
    return `Like this video! Current likes: ${this._videoLikes}`;
  }

  get videoLikes() {
    return this._videoLikes;
  }

  set videoLikes(likes) {
    if (likes < 0) {
      throw new Error("Likes must be >= 0");
    }
    this._videoLikes = likes;
  }
}

const teacher = new TeacherWithAccessors("Piyush", "RoadsideCoder");
teacher.videoLikes = 10;
console.log(teacher.videoLikes);
