// EVENT PROPAGATION – Interview Notes
// Event propagation defines how events travel through the DOM

// There are 3 phases:
// 1. Capturing phase (top → bottom)
// 2. Target phase
// 3. Bubbling phase (bottom → top)

// --------------------------------------------------
// Question 1 : Event Bubbling
// Event flows from target element up to the root
// NOTE: focus and blur events do NOT bubble

const div = document.querySelector("div");
const form = document.querySelector("form");
const button = document.querySelector("button");

div.addEventListener("click", function () {
  alert("div");
});

form.addEventListener("click", function () {
  alert("form");
});

button.addEventListener("click", function () {
  alert("button");
});

// Clicking button → alert order:
// button → form → div

// --------------------------------------------------
// Question 2 : event.target vs event.currentTarget vs this

function func(event) {
  alert(
    "currentTarget = " + event.currentTarget.tagName +
    ", target = " + event.target.tagName +
    ", this = " + this.tagName
  );
}

div.addEventListener("click", func);
form.addEventListener("click", func);
button.addEventListener("click", func);

// event.target → element where event originated
// event.currentTarget → element whose listener is currently running
// this → same as event.currentTarget (in normal functions)

// --------------------------------------------------
// Question 3 : Event Capturing
// Event flows from root → target
// Enabled using { capture: true }

div.addEventListener("click", function () {
  alert("div");
}, { capture: true });

form.addEventListener("click", function () {
  alert("form");
}, { capture: true });

button.addEventListener("click", function () {
  alert("button");
}, { capture: true });

// Clicking button → alert order:
// div → form → button

// --------------------------------------------------
// Question 4 : stopPropagation()
// Stops event from bubbling or capturing further

div.addEventListener("click", function () {
  alert("div");
});

form.addEventListener("click", function (event) {
  event.stopPropagation(); // stops bubbling here
  alert("form");
});

button.addEventListener("click", function () {
  alert("button");
});

// Clicking button → alert order:
// button → form
// div will NOT be triggered

// --------------------------------------------------
// Question 5 : Event Delegation
// Instead of attaching listeners to many children,
// attach ONE listener to the parent

document.querySelector(".products").addEventListener("click", (event) => {
  // event.target gives the actual clicked element

  if (event.target.tagName === "SPAN") {
    // closest() can be used for safer traversal
    window.location.href += "/" + event.target.className;
  }
});

// Benefits:
// - Better performance
// - Handles dynamically added elements
// - Cleaner code

// --------------------------------------------------
// Question 6 : Output (Mixed capturing & bubbling)

div.addEventListener("click", function () {
  alert("div");
});

form.addEventListener("click", function () {
  alert("form");
}, { capture: true });

button.addEventListener("click", function () {
  alert("button");
});

// Clicking button → alert order:
// form (capture)
// button (target)
// div (bubble)

// --------------------------------------------------
// Question 7 : Modal close on outside click
// Close modal when clicking on negative space

const container = document.querySelector(".modalContainer");
const modalButton = document.querySelector(".modalButton");

modalButton.addEventListener("click", () => {
  toggleModal(true);
});

function toggleModal(toggle) {
  container.style.display = toggle ? "flex" : "none";
}

container.addEventListener("click", (e) => {
  // Only close if user clicks on overlay, not modal content
  if (e.target.className === "modalContainer") {
    toggleModal(false);
  }
});
