const fs = require("fs");
const input = fs.readFileSync("./dayThreeInput.txt").toString().split("\n");

input.pop();
const test = fs.readFileSync("./dayThreeExample.txt").toString().split("\n");

const findTrees = (field, right, down) => {
  let row = 0,
    col = 0,
    treeCount = 0;
  while (row < field.length) {
    if (field[row][col] === "#") treeCount++;

    col = (col + right) % input[0].length;
    console.log(`${col},${right} || ${col + right} % ${input[0].length}`);
    row += down;

    // if (col > field[0].length - 1) col -= field[0].length;
  }
  return treeCount;
};

const partTwo = (field, slopes) => {
  let totalTrees = 1;
  slopes.forEach((slope) => {
    let right = slope[0];
    let down = slope[1];

    totalTrees *= findTrees(input, right, down);
  });
  return totalTrees;
};

//Part two slopes
let restOfSlopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

console.log(findTrees(input, 3, 1));
