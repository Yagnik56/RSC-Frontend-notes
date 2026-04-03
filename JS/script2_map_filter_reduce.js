// MAP, FILTER & REDUCE – Interview Notes

// For loop through object, array, string
// in  → keys (property names)
// of  → values (iterables)

// --------------------------------------------------
// Question 1 : Array.map()

const nums = [1, 2, 3, 4];

const multiplyThree = nums.map((num, i, arr) => num * 3);
// callback can take value, index and array
console.log(multiplyThree); // [3, 6, 9, 12]

// --------------------------------------------------
// Question 2 : Array.filter()

const nums2 = [1, 2, 3, 4];

const moreThanTwo = nums2.filter((num, i, arr) => num > 2);
console.log(moreThanTwo); // [3, 4]

// --------------------------------------------------
// Question 3 : Array.reduce()

const nums3 = [1, 2, 3, 4];

const sum = nums3.reduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0);

console.log(sum); // 10

// --------------------------------------------------
// Question 4 : Map Polyfill

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }
  return temp;
};

// --------------------------------------------------
// Question 5 : Filter Polyfill

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) temp.push(this[i]);
  }
  return temp;
};

// --------------------------------------------------
// Question 6 : Reduce Polyfill

Array.prototype.myReduce = function (cb, initialValue) {
  let accumulator = initialValue;

  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};

// --------------------------------------------------
// Question 7 : map vs forEach

let students = [
  { name: "Piyush", rollNumber: 31, marks: 80 },
  { name: "Jenny", rollNumber: 15, marks: 69 },
  { name: "Kaushal", rollNumber: 16, marks: 35 },
  { name: "Dilpreet", rollNumber: 7, marks: 55 },
];

// Q1 - Return only the names of students in capital

// Solution 1 : Traditional for loop
let names1 = [];
for (let i = 0; i < students.length; i++) {
  names1.push(students[i].name.toUpperCase());
}
console.log(names1);

// Solution 2 : forEach()
let names2 = [];
students.forEach((student) => {
  names2.push(student.name.toUpperCase());
});
console.log(names2);

// Solution 3 : map()
let names3 = students.map((stu) => stu.name.toUpperCase());
console.log(names3);

// --------------------------------------------------
// Q2 - Get the details of students who scored more than 60 marks

let above60 = students.filter((stu) => stu.marks > 60);
console.log(above60);

// --------------------------------------------------
// Q3 - Get the details of students who scored more than 60
// and have rollNumber greater than 15

let filteredStudents = students.filter(
  (stu) => stu.marks > 60 && stu.rollNumber > 15
);
console.log(filteredStudents);

// --------------------------------------------------
// Q4 - Sum total of the marks of the students

let totalMarks = students.reduce((acc, stu) => acc + stu.marks, 0);
console.log(totalMarks);

// --------------------------------------------------
// Q5 - Get only the names of students who scored more than 60 marks

let namesAbove60 = students
  .filter((stu) => stu.marks > 60)
  .map((stu) => stu.name);

console.log(namesAbove60);

// --------------------------------------------------
// Q6 - Print the total marks of students with marks > 60
// after adding 20 marks to those who scored less than 60

let finalTotalMarks = students
  .map((stu) => {
    if (stu.marks < 60) {
      return { ...stu, marks: stu.marks + 20 };
    }
    return stu;
  })
  .filter((stu) => stu.marks > 60)
  .reduce((acc, curr) => acc + curr.marks, 0);

console.log(finalTotalMarks);
