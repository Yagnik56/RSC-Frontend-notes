// COMPOSE & PIPE – Interview Notes
// Used to combine multiple functions into a single function

// --------------------------------------------------
// Sample functions

const addFive = (num) => num + 5;
const subtractTwo = (num) => num - 2;
const multiplyFour = (num) => num * 4;

// --------------------------------------------------
// COMPOSE
// compose(f, g, h)(x) → f(g(h(x)))
// Functions execute from RIGHT → LEFT

function compose(...fns) {
  return function (initialValue) {
    return fns.reduceRight((acc, currFn) => {
      return currFn(acc);
    }, initialValue);
  };
}

const evaluate = compose(addFive, subtractTwo, multiplyFour);

// Execution order:
// multiplyFour(5) → 20
// subtractTwo(20) → 18
// addFive(18) → 23

console.log(evaluate(5)); // 23

// --------------------------------------------------
// PIPE
// pipe(f, g, h)(x) → h(g(f(x)))
// Functions execute from LEFT → RIGHT

function pipe(...fns) {
  return function (initialValue) {
    return fns.reduce((acc, currFn) => {
      return currFn(acc);
    }, initialValue);
  };
}

const evaluatePipe = pipe(addFive, subtractTwo, multiplyFour);

// Execution order:
// addFive(5) → 10
// subtractTwo(10) → 8
// multiplyFour(8) → 32

console.log(evaluatePipe(5)); // 32
