/**
 * Homework: Write a polyfill for Object.freeze();
 * @param {object} obj
 */

Object.myFreeze = function (obj) {
  Object.preventExtensions(obj);

  for (const key in obj) {
    Object.defineProperty(obj, key, {
      configurable: false,
      writable: false,
    });
  }
};

const myFreezeObj = {
  name: "apple",
  price: 100,
};

Object.myFreeze(myFreezeObj);
// CREATE
myFreezeObj.type = "fruit";
// UPDATE
myFreezeObj.price = 150;
// DELETE
delete myFreezeObj.name;
console.log(myFreezeObj);

/**
 * Homework: Write a polyfill for Object.seal();
 * @param {object} obj
 */

Object.mySeal = function (obj) {
  Object.preventExtensions(obj);

  for (const key in obj) {
    Object.defineProperty(obj, key, {
      configurable: false,
    });
  }
};

const mySealObj = {
  name: "apple",
  price: 100,
};

Object.mySeal(mySealObj);
// CREATE
mySealObj.type = "fruit";
// UPDATE
mySealObj.name = "banana";
// DELETE
delete mySealObj.price;
console.log(mySealObj);

/**
 * Homework: Write a polyfill for Object.preventExtensions();
 * @param {object} obj
 */

/**
 * Homework: Write a function to abort async functions;
 * @param {object} signal
 */

async function myAsyncFunctionWithAbortFunctionality(signal) {
  const result = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => resolve("The promise is complete"), 1000);
    signal.addEventListener("abort", () => {
      // May clear out the async operation - like in this case run clearTimeout(timeout)
      reject("Process Aborted");
    });
  });
  return result;
}

const controller = new AbortController();
const signal = controller.signal;

myAsyncFunctionWithAbortFunctionality(signal)
  .then(console.log)
  .catch(console.log);

controller.abort();
