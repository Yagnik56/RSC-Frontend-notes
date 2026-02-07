// PROMISES – Interview Notes
// Promise repents the eventual fulfillment (or failure) of an asynchronous operation and its resulting value.

// --------------------------------------------------
// Synchronous vs Asynchronous Code

// Synchronous code
console.log("start");
console.log("Subscribe to Roadside Coder");
console.log("stop");

// Asynchronous (setTimeout)
console.log("start");

setTimeout(() => {
  console.log("Subscribe to Roadside Coder");
}, 2000); // run at last as js runs the async code after sync code

console.log("stop");

// --------------------------------------------------
// Async example (WRONG way)

console.log("start");

function importantAction(username) {
  setTimeout(() => {
    return `Subscribe to ${username}`; // ❌ return inside async
  }, 1000);
}

const message = importantAction("Roadside Coder");
console.log(message); // undefined

console.log("stop");

// --------------------------------------------------
// Callback (Correct async handling)

console.log("start");

function importantAction(username, cb) {
  setTimeout(() => {
    cb(`Subscribe to ${username}`);
  }, 1000);
}

importantAction("Roadside Coder", (message) => {
  console.log(message);
});

console.log("stop");

// --------------------------------------------------
// Callback Hell (Pyramid of Doom)
console.log("start");

function importantAction(username, cb) {
  setTimeout(() => {
    cb(`Subscribe to ${username}`);
  }, 1000);
}

function likeTheVideo(video, cb) {
  setTimeout(() => {
    cb(`Like the ${video} video`);
  }, 1000);
}

function shareTheVideo(video, cb) {
  setTimeout(() => {
    cb(`Share the ${video} video`);
  }, 1000);
}

importantAction("Roadside Coder", (message) => {
  console.log(message);
  likeTheVideo("Like the Video", (action) => {
    console.log(action);
    shareTheVideo("Share the video", (action) => {
      console.log(action);
    });
  });
});

console.log("stop");

// --------------------------------------------------
// PROMISES

console.log("start");

const sub = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = true;
    if (result) resolve("Subscribed to Roadside Coder");
    else reject(new Error("Why aren't you subscribed to Roadside Coder?"));
  }, 2000);
});

sub
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("stop");

// --------------------------------------------------
// Rewriting Callbacks using Promises

console.log("start");

function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe to ${username}`);
    }, 1000);
  });
}

function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like the ${video} video`);
    }, 1000);
  });
}

function shareTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Share the ${video} video`);
    }, 1000);
  });
}

importantAction("Roadside Coder")
  .then((res) => {
    console.log(res);
    likeTheVideo("Javascript Interview Questions").then((res) => {
      console.log(res);
      shareTheVideo("Javascript Interview Questions").then((res) => {
        console.log(res);
      });
    });
  })
  .catch((err) => console.log(err));

console.log("stop");

// --------------------------------------------------
// Promise Chaining (Correct way)

importantAction("Roadside Coder")
  .then((res) => {
    console.log(res);
    return likeTheVideo("Like Javascript Interview Questions");
  })
  .then((res) => {
    console.log(res);
    return shareTheVideo("Share Javascript Interview Questions");
  })
  .then((res) => {
    console.log(res);
  });

// --------------------------------------------------
// Promise Combinators

// Promise.all → fails fast
// run all the promise in parallel and return array of fulfilled promises but if one promise fails then fails all
console.log("start");

Promise.all([
  importantAction("Roadside Coder"),
  likeTheVideo("Javascript Interview Questions"),
  shareTheVideo("Javascript Interview Questions"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("stop");

// Promise.race → first settled
// this returns the first promise which get fulfilled whether it's resolved or rejected
console.log("start");

Promise.race([
  importantAction("Roadside Coder"),
  likeTheVideo("Javascript Interview Questions"),
  shareTheVideo("Javascript Interview Questions"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("stop");

// Promise.allSettled → always resolves
// run all the promise in parallel like promise all and return array of fulfilled and rejected promises unlike promise all which fail all if one fail
console.log("start");

Promise.allSettled([
  importantAction("Roadside Coder"),
  likeTheVideo("Javascript Interview Questions"),
  shareTheVideo("Javascript Interview Questions"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("stop");

// Promise.any → first fulfilled
// this returns the first fulfilled promise ignoring all failed ones unless all fail then reject and give error
console.log("start");

Promise.any([
  importantAction("Roadside Coder"),
  likeTheVideo("Javascript Interview Questions"),
  shareTheVideo("Javascript Interview Questions"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("stop");

// --------------------------------------------------
// async / await

async function result() {
  try {
    const message1 = await importantAction("Roadside Coder");
    const message2 = await likeTheVideo("Javascript Interview Questions");
    const message3 = await shareTheVideo("Javascript Interview Questions");

    console.log({ message1, message2, message3 });
  } catch (err) {
    console.error(err);
  }
}

result();

// --------------------------------------------------
// OUTPUT BASED QUESTIONS (KEY INTERVIEW AREA)

// Question 1 : What is Output?

console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
});

promise1.then((res) => {
  console.log(res);
});

console.log("end");

// Output: start 1 end 2

// Question 2 : What is Output?

console.log("start");

const promise2 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2); // if no resolve then it won't go in then
  console.log(3);
});

promise2.then((res) => {
  console.log(res);
});

console.log("end");

// Output: start 1 3 end 2

// Question 3 : What is Output?

console.log("start");

const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });

console.log("middle");

fn().then((res) => {
  console.log(res);
});

console.log("end");

// Output: start middle 1 end success

// --------------------------------------------------
// Promise rejection flow
// Question 4 : What is Output?

function job() {
  return new Promise(function (resolve, reject) {
    reject();
  });
}

job()
  .then(function () {
    console.log("Success 1");
  })

  .then(function () {
    console.log("Success 2");
  })

  .then(function () {
    console.log("Success 3");
  })

  .catch(function () {
    console.log("Error 1");
  })

  .then(function () {
    console.log("Success 4");
  });

// Output: Error 1, Success 4

// --------------------------------------------------
// Promise resolution + catch recovery
// Question 5 : What is Output?

function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("success");
    } else {
      reject("error");
    }
  });
}

job(true)
  .then((res) => {
    console.log(res);

    return job(false);
  })
  .catch(function (error) {
    console.log(error);

    return "Error caught";
  })
  .then(function (data) {
    console.log(data);

    return job(true);
  })
  .catch(function (error) {
    console.log(error);
  });

// Question 6 : What is the Output?

function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("success");
    } else {
      reject("error");
    }
  });
}

let promise = job(true);

promise
  .then(function (data) {
    console.log(data);

    return job(true);
  })
  .then(function (data) {
    if (data !== "victory") {
      throw "Defeat";
    }
    return job(true);
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
    return job(false);
  })
  .then(function (data) {
    console.log(data);
    return job(true);
  })
  .catch(function (error) {
    console.log(error);
    return "Error caught";
  })
  .then(function (data) {
    console.log(data);
    return new Error("test"); // Not Returning a promise
  })
  .then(function (data) {
    console.log("Success:", data.message);
  })
  .catch(function (data) {
    console.log("Error:", data.message);
  });

// --------------------------------------------------
// Promise resolving promise
// first promise resolves to text called "first", then second promise resolves to first promise and what we do is resolve the second promise output of which we have to pass in first promise then print the first promise output

const firstPromise = new Promise((resolve, reject) => {
  resolve("First!");
});

const secondPromise = new Promise((resolve, reject) => {
  resolve(firstPromise);
});

secondPromise.then((res) => res).then((res) => console.log(res));

// --------------------------------------------------

// Question 8 : Rewrite this example code using `async/await`
//  Instead of `.then/catch`

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson("https://javascript.info/no-such-user.json").catch(alert);

// Answer
async function loadJson(url) {
  // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson("https://javascript.info/no-such-user.json").catch(alert);

// --------------------------------------------------
// Question 9 : Solve Promise Recursively

function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe to ${username}`);
    }, 1000);
  });
}

function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like the ${video} video`);
    }, 1000);
  });
}

function shareTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Share the ${video} video`);
    }, 1000);
  });
}

function promRecurse(funcPromises) {
  if (funcPromises.length === 0) return;
  const promi = funcPromises.shift();

  promi.then((result) => console.log(result)).catch((err) => console.log(err));

  promRecurse(funcPromises);
}

promRecurse([
  importantAction("Roadside Coder"),
  likeTheVideo("Javascript Interview Questions"),
  shareTheVideo("Javascript Interview Questions"),
]);

// Question 10 : Promise Polyfill

function PromisePolyFill(executor) {
  let onResolve,
    onReject,
    fulfilled = false,
    rejected = false,
    called = false,
    value;

  function resolve(v) {
    fulfilled = true;
    value = v;

    if (typeof onResolve === "function") {
      // for async
      console.log("inside resolve");
      onResolve(value);
      called = true;
    }
  }

  function reject(reason) {
    rejected = true;
    value = reason;

    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;

    if (fulfilled && !called) {
      // for sync
      console.log("inside then");
      called = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (rejected && !called) {
      called = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

const promise1 = new PromisePolyFill((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    resolve(2);
  }, 1000);
  console.log(3);
});

promise1.then((res) => {
  console.log(res);
});

const examplePromise = new PromisePolyFill((resolve, reject) => {
  resolve(2);
});

examplePromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

PromisePolyFill.resolve = (val) =>
  new PromisePolyFill(function executor(resolve, reject) {
    resolve(val);
  });

PromisePolyFill.reject = (val) =>
  new PromisePolyFill(function executor(resolve, reject) {
    reject(val);
  });

// promise.all() polyfill

PromisePolyFill.all = (promises) => {
  let fulfilledPromises = [],
    result = [];

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) =>
      promise
        .then((val) => {
          fulfilledPromises.push(true);
          result[index] = val;

          if (fulfilledPromises.length === promises.length) {
            return resolve(result);
          }
        })
        .catch((error) => {
          return reject(error);
        }),
    );
  });
};

// --------------------------------------------------
// PROMISE POLYFILL – IMPORTANT

// ❌ First polyfill failed because:
// - No async queue
// - No chaining
// - then() didn’t return a promise

// ✅ Correct Promise Polyfill (Minimal)

function PromisePolyFill(executor) {
  let state = "PENDING";
  let value;
  let handlers = [];

  const asyncRun = (fn) => queueMicrotask(fn);

  function resolve(val) {
    if (state !== "PENDING") return;
    state = "FULFILLED";
    value = val;
    handlers.forEach(runHandler);
  }

  function reject(err) {
    if (state !== "PENDING") return;
    state = "REJECTED";
    value = err;
    handlers.forEach(runHandler);
  }

  function runHandler(handler) {
    asyncRun(() => {
      if (state === "FULFILLED") {
        handler.onFulfilled(value);
      } else {
        handler.onRejected(value);
      }
    });
  }

  this.then = function (onFulfilled, onRejected) {
    return new PromisePolyFill((resolveNext, rejectNext) => {
      const handler = {
        onFulfilled(val) {
          try {
            resolveNext(onFulfilled ? onFulfilled(val) : val);
          } catch (e) {
            rejectNext(e);
          }
        },
        onRejected(err) {
          try {
            if (onRejected) resolveNext(onRejected(err));
            else rejectNext(err);
          } catch (e) {
            rejectNext(e);
          }
        },
      };

      state === "PENDING"
        ? handlers.push(handler)
        : runHandler(handler);
    });
  };

  this.catch = function (fn) {
    return this.then(null, fn);
  };

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// --------------------------------------------------
// Promise.all polyfill

PromisePolyFill.all = function (promises) {
  return new PromisePolyFill((resolve, reject) => {
    let result = [];
    let count = 0;

    promises.forEach((p, i) => {
      p.then((val) => {
        result[i] = val;
        count++;
        if (count === promises.length) resolve(result);
      }).catch(reject);
    });
  });
};

// --------------------------------------------------
// Promise.finally explanation
// finally() runs regardless of resolve or reject
// does NOT receive value or error
// used for cleanup

Promise.prototype.finally = function (cb) {
  return this.then(
    (res) => Promise.resolve(cb()).then(() => res),
    (err) => Promise.resolve(cb()).then(() => {
      throw err;
    })
  );
};

