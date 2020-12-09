const fs = require("fs");
const input = fs
  .readFileSync("./day9input.txt")
  .toString()
  .split("\n")
  .map((num) => Number(num));

const test = fs
  .readFileSync("./day9test.txt")
  .toString()
  .split("\n")
  .map((num) => Number(num));

console.log(test);

const containSum = (array, target) => {
  for (let i = 0; i < array.length; i++) {
    if (array.includes(target - array[i])) return true;
  }
  return false;
};

const findWeakness = (array, preamble) => {
  let L = 0;
  let R = preamble;

  while (R < array.length) {
    if (!containSum(array.slice(L, R + 1), array[R])) return array[R];
    L++;
    R++;
  }
};

const weakness = findWeakness(test, 5);
console.log("weakness", weakness);

function getSubArray(arr, num) {
  var sum = 0,
    blank = [];
  var bigArr = [];
  for (var i = 0; i < arr.length; i++) {
    sum = arr[i];
    if (blank.length === 0) {
      blank.push(arr[i]);
    }
    for (var j = 1; i < arr.length; j++) {
      sum += arr[j];
      if (sum < num) {
        blank.push(arr[j]);
      } else if (sum > num) {
        sum = 0;
        blank = [];
        break;
      } else {
        blank.push(arr[j]);
        bigArr.push(blank);
        sum = 0;
        blank = [];
      }
    }
  }

  return bigArr;
}

let subArray = getSubArray(input, weakness);
console.log(subArray);

// console.log(Math.max(subArray));
// console.log(Math.min(subArray));

// const partTwo = (array, target) => {
//   let L = 0
//   let R = 1
//   let currentSum = array[0] + array[1]

//   while( R < array.length ){

//   }

// }
