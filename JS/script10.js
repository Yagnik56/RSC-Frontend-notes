// DEBOUNCE & THROTTLING – Interview Notes

// --------------------------------------------------
// Key Difference
//
// Debounce:
// - Executes function AFTER a delay
// - Resets timer on every event
// - Best for search input, resize, typing
//
// Throttle:
// - Executes function at MOST once per time interval
// - Ignores events in between
// - Best for scroll, resize, button spam

// --------------------------------------------------
// Question 1 : Debounce Example (using lodash)

// UI:
// - Show "Button Pressed X Times" on every click
// - Increase "Triggered Y Times" after 800ms debounce

const btn = document.querySelector(".increment_btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

let triggerCount = 0;
let pressedCount = 0;

// Debounced function runs only after user stops clicking for 800ms
const debouncedCount = _.debounce(() => {
  triggerCount += 1;
  count.innerHTML = triggerCount;
}, 800);

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount;
  debouncedCount();
});

// --------------------------------------------------
// Question 2 : Throttle Example (using lodash)

// UI:
// - Show "Button Pressed X Times" on every click
// - Increase "Triggered Y Times" at most once every 1000ms

let triggerCount2 = 0;
let pressedCount2 = 0;

const throttled = _.throttle(() => {
  triggerCount2 += 1;
  count.innerHTML = triggerCount2;
}, 1000);

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount2;
  const now = new Date().getTime();
  const seconds = (now-start)/1000
  console.log(seconds.toFixed());
  throttled();
});

// --------------------------------------------------
// Question 3 : Debounce Polyfill
// Creates a debounced version of a function
// Function executes only after delay has passed
// since the last call

const myDebounce = function (cb, delay) {
  let timer;

  return function (...args) {
    // Clear previous timer
    if (timer) clearTimeout(timer);

    // Start a new timer
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

let triggerCount3 = 0;
let pressedCount3 = 0;

const debouncedFn = myDebounce(() => {
  triggerCount3++;
  count.innerHTML = triggerCount3;
}, 800);

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount3;
  debouncedFn();
});

// --------------------------------------------------
// Question 4 : Throttle Polyfill
// Ensures function executes at most once
// within the given delay window

const myThrottle = function (cb, delay) {
  let last = 0;

  return function (...args) {
    const now = Date.now();

    // If called before delay, ignore
    if (now - last < delay) return;

    last = now;
    return cb(...args);
  };
};

let triggerCount4 = 0;
let pressedCount4 = 0;

const throttledFn = myThrottle(() => {
  triggerCount4++;
  count.innerHTML = triggerCount4;
}, 1000);

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount4;
  const now = new Date().getTime()
  const seconds = (now-start)/1000
  console.log(seconds.toFixed());
  throttledFn();
});