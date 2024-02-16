/**
 * Homework 1: 'You have to flatten an obj'
 */

function flattenObj(obj) {
  let result = {};
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      // Case 1: Object is null
      if (obj[key] === null) result[key] = null;
      else if (Array.isArray(obj[key])) {
        // Case 2: Object is an Array
        const flattenedArray = flattenArray(obj[key]);

        for (let i = 0; i < flattenedArray.length; i++) {
          result[`${key}.${i}`] = flattenedArray[i];
        }
      } else {
        // Case 3: Object is another object
        const flattenedObj = flattenObj(obj[key]);

        for (let el in flattenedObj) {
          result[`${key}.${el}`] = flattenedObj[el];
        }
      }
    } else {
      result[key] = obj[key];
    }
  }
  // In case we have an object in an array
  if (!isObjectFlat(result)) result = flattenObj(result);
  return result;
}

function flattenArray(arr) {
  if (!Array.isArray(arr)) throw Error("Array required");

  let result = [];
  for (let el of arr) {
    if (typeof el === "object") {
      if (Array.isArray(el)) {
        result.push(...flattenArray(el));
      } else if (el === null) result.push(el);
      else {
        // Condition for the case when we have an object in the array
        result.push(flattenObj(el));
      }
    } else {
      result.push(el);
    }
  }
  return result;
}

function isObjectFlat(obj) {
  for (let el in obj) {
    if (typeof obj[el] === "object") {
      if (Array.isArray(obj[el])) return false;
      if (obj[el] != null) return false;
    }
  }
  return true;
}

const testCase = {
  name: "apple",
  age: "33",
  details: {
    address: {
      city: "Bangalore",
      country: "IN",
      pin: 434343,
    },
    nicknames: [
      "appy",
      "fizz",
      "oh bouy",
      {
        father: "useless",
        mother: "priceless",
        bestFriend: "idiot",
        friends: ["cool", "buddy", "mate"],
      },
    ],
  },
};
// const flatB = flattenObj(testCase);
// console.log(flatB);

/**
 * Homework 2: 'You have to wite polyfill for deep clone of an object' const newObj = obj.deepClone()
 */

Object.prototype.deepClone = function dc(context = null) {
  const result = Array.isArray(this) ? [] : {};
  const objToBeCopied = context ?? this;

  for (let el in objToBeCopied) {
    if (typeof objToBeCopied[el] === "object") {
      if (objToBeCopied[el] == null) result[el] = null;
      else result[el] = dc(objToBeCopied[el]);
    } else {
      result[el] = objToBeCopied[el];
    }
  }

  return result;
};

const syllabus = {
  maths: {
    trigonometry: "A K Singh",
    geometry: "V K Singh",
    algebra: "R S Agarawal",
  },
  physics: "H K Verma",
  chemistry: {
    organic: "S Chand Publication",
    inorganic: {
      carbon: {
        part1: "G D Sharma",
        part2: "A K Hungal",
      },
    },
    printChemBooks: function () {
      console.log(this.organic);
      for (let book in this.inorganic.carbon) {
        console.log(this.inorganic.carbon[book]);
      }
    },
  },
  others: [
    { economics: "B B Bhagat" },
    {
      english: "P L Mehta",
      others: ["Part 1, Gulmohar Series", "Part 2, Gulmohar Series"],
    },
  ],
};

const syllabusDeepClone = syllabus.deepClone();
syllabusDeepClone.physics = "HH VERMA";
console.log(syllabus.physics);
console.log(syllabusDeepClone.physics);
console.log("******");

syllabusDeepClone.others[1].others[0] = "Rainbow Series";
console.log(syllabus.others[1].others[0]);
console.log(syllabusDeepClone.others[1].others[0]);
console.log("******");

syllabusDeepClone.chemistry.organic = "SCHPUB";
console.log(syllabus.chemistry.organic);
console.log("******");

syllabus.chemistry.printChemBooks();
syllabusDeepClone.chemistry.printChemBooks();

/**
 * Homework 3:  .find | .findIndex | .sort | .some
 *
 * find: finds and returns the value of the element that meets the testing criterion
 * provided in the callback function passed to it as the argument to it. If none of the element matches the criterion,
 * undefined is returned.
 *
 * findIndex: finds and returns the index of the first element that matches the criterion in the callback function/value passed
 * to it as a parameter. If no element is found, it returns -1;
 *
 * sort: takes a callback function to sorts the array according to the conditions in the callback function. If no callback function
 * is provided, it sorts the array in the ascending order(alphabetically, even for numbers like 1000 will come before 3).
 *
 * some: this function returns true if any element/s meets the condition in the callback function. False otherwise.
 *
 */

/**
 * Homework 4: Difference bw splice and slice in array
 *
 * splice function is used to modify an array. We can add/delete/replace the elements of an array with it.
 * Its signature is splice(startIdx, [deleteCount], [...args]).
 * startIdx is the index from where to start making changes.
 * deletecount in the number of the elements to be deleted from the given start index.
 * args is the item(s) to be inserted into the array.
 *
 *
 * slice: this function returns a shallow copy of an array from a given start index to end index.
 * Its signature is slice([startIdx], [endIdx])
 *
 */
