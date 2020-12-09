const fs = require("fs");
const input = fs
  .readFileSync("./day9input.txt")
  .toString()
  .split("\n")
  .map((num) => Number(num));

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

const weakness = findWeakness(input, 25);

const partTwo = (array, target) => {
  let L = 0;
  let R = 1;
  let sumArray = () => {
    return array.slice(L, R + 1).reduce((a, b) => {
      return a + b;
    }, 0);
  };
  let currentSum = sumArray();
  while (R < array.length) {
    if (currentSum < target) {
      R++;
      currentSum = sumArray();
    } else if (currentSum > target) {
      L++;
      currentSum = sumArray();
    }
    if (currentSum === target) {
      return array.slice(L, R + 1);
    }
  }
};
const found = partTwo(input, weakness);
console.log(Math.max(...found) + Math.min(...found));
