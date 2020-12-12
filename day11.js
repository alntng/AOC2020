/* eslint-disable max-statements */
/* eslint-disable complexity */
const fs = require("fs");
const { fill, after } = require("lodash");
const input = fs.readFileSync("./day11input.txt").toString().split("\n");
input.pop();
// .map((row) => row.split(""));
for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split("");
}

const test = fs.readFileSync("./day11test.txt").toString().split("\n");
test.pop();

for (let i = 0; i < test.length; i++) {
  test[i] = test[i].split("");
}

const checkAround = (layout, row, col) => {
  let allAround = [];
  // console.log(`Before ${row},${col}`);
  const checkDirection = (x, y) => {
    let currentRow = row + x;
    let currentCol = col + y;
    while (
      currentRow >= 0 &&
      currentRow < layout.length &&
      currentCol >= 0 &&
      currentCol < layout[0].length
    ) {
      if (layout[currentRow][currentCol] === "#") {
        // console.log("adding a seat");
        // console.log(currentRow, currentCol);
        allAround.push("#");
        return;
      } else if (layout[currentRow][currentCol] === "L") {
        allAround.push("L");
        return;
      } else {
        currentRow += x;
        currentCol += y;
      }
    }
    // console.log("found no seat");
    allAround.push("L");
    // return;
  };

  //top left
  if (layout[row - 1] && layout[row - 1][col - 1]) {
    checkDirection(-1, -1);
    // console.log("current", row, col);
    // let currentRow = row--;
    // let currentCol = col--;
    // while (currentRow && currentCol) {
    //   if (layout[currentRow][currentCol] === "#") {
    //     console.log("adding a seat");
    //     console.log(currentRow, currentCol);
    //     allAround.push("#");
    //     break;
    //   } else {
    //     currentRow--;
    //     currentCol--;
    //   }
    // }
    // console.log("found no seat");
    // allAround.push("L");
    // allAround.push(layout[row - 1][col - 1]);
  } else {
    // console.log("out of bounds", row, col);
    allAround.push("L");
  }
  //top
  if (layout[row - 1] && layout[row - 1][col]) {
    checkDirection(-1, 0);
    // allAround.push(layout[row - 1][col]);
  } else {
    allAround.push("L");
  }
  //topRight
  if (layout[row - 1] && layout[row - 1][col + 1]) {
    checkDirection(-1, 1);
    // allAround.push(layout[row - 1][col + 1]);
  } else {
    allAround.push("L");
  }
  //left
  if (layout[row] && layout[row][col - 1]) {
    checkDirection(0, -1);
    // allAround.push(layout[row][col - 1]);
  } else {
    allAround.push("L");
  }
  //right;
  if (layout[row] && layout[row][col + 1]) {
    checkDirection(0, 1);
    // allAround.push(layout[row][col + 1]);
  } else {
    allAround.push("L");
  }
  //bottomLeft
  if (layout[row + 1] && layout[row + 1][col - 1]) {
    checkDirection(1, -1);
    // allAround.push(layout[row + 1][col - 1]);
  } else {
    allAround.push("L");
  }
  //bottom
  if (layout[row + 1] && layout[row + 1][col]) {
    checkDirection(1, 0);
    // allAround.push(layout[row + 1][col]);
  } else {
    allAround.push("L");
  }
  //bottomRight
  if (layout[row + 1] && layout[row + 1][col + 1]) {
    checkDirection(1, 1);
    // allAround.push(layout[row + 1][col + 1]);
  } else {
    allAround.push("L");
  }

  // console.log(`After ${row},${col}`);
  // console.log("=====");

  let filledAround = 0;

  allAround.forEach((seat) => {
    if (seat === "#") filledAround++;
  });
  // console.log(`current seat ${layout[row][col]}`);
  // console.log(filledAround);
  return filledAround;
};

const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

const part1 = (seats) => {
  // console.log(seats.length, seats[0].length);
  let changed = true;
  let changeCount = 0;

  while (changed === true) {
    changed = false;
    let clone = deepCopyFunction(seats);
    for (let row = 0; row < seats.length; row++) {
      for (let col = 0; col < seats[0].length; col++) {
        let currentSeat = seats[row][col];
        // console.log([row, col]);
        let filled = checkAround(seats, row, col);
        if (row === 0 && col === 9) {
          console.log("0,9");
          console.log("filled", filled);
        }

        // console.log(`filled ${filled}`);
        // console.log(filled);
        if (currentSeat === "L" && filled === 0) {
          // console.log("changing to filled");
          // console.log(`before: ${clone[row][col]}`);
          clone[row][col] = "#";
          // console.log(`after: ${clone[row][col]}`);
          changed = true;
        } else if (currentSeat === "#" && filled >= 5) {
          // console.log("changing to empty");
          clone[row][col] = "L";
          changed = true;
        }
      }
    }
    // console.log("passed through entire array");
    // console.log(clone);
    if (changed === true) {
      changeCount++;
      // console.log(changeCount);
      seats = deepCopyFunction(clone);
      // console.log(changeCount);
      // console.log(seats);
    }
  }

  // console.log(seats);

  let totalOccupied = 0;
  // console.log(seats);
  for (let row = 0; row < seats.length; row++) {
    for (let col = 0; col < seats[0].length; col++) {
      if (seats[row][col] === "#") totalOccupied++;
    }
  }
  return totalOccupied;
};

// console.log(test);
console.log(part1(input));