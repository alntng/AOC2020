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

    allAround.push("L");
  };

  //top left
  if (layout[row - 1] && layout[row - 1][col - 1]) {
    checkDirection(-1, -1);
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

  let filledAround = 0;

  allAround.forEach((seat) => {
    if (seat === "#") filledAround++;
  });

  return filledAround;
};

const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }

  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

const part1 = (seats) => {
  let changed = true;

  while (changed === true) {
    changed = false;
    let clone = deepCopyFunction(seats);
    for (let row = 0; row < seats.length; row++) {
      for (let col = 0; col < seats[0].length; col++) {
        let currentSeat = seats[row][col];

        let filled = checkAround(seats, row, col);

        if (currentSeat === "L" && filled === 0) {
          clone[row][col] = "#";

          changed = true;
        } else if (currentSeat === "#" && filled >= 5) {
          clone[row][col] = "L";
          changed = true;
        }
      }
    }

    if (changed === true) {
      changeCount++;

      seats = deepCopyFunction(clone);
    }
  }

  let totalOccupied = 0;

  for (let row = 0; row < seats.length; row++) {
    for (let col = 0; col < seats[0].length; col++) {
      if (seats[row][col] === "#") totalOccupied++;
    }
  }
  return totalOccupied;
};

// console.log(test);
console.log(part1(input));
