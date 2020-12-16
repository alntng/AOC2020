const fs = require("fs");
const input = fs.readFileSync("./dayFiveInput.txt").toString().split("\n");
input.pop();

let testInput = fs.readFileSync("./dayFiveTest.txt").toString().split("\n");
testInput.pop();
// console.log(testInput);

const binaryBoard = (passes) => {
  //highestId = 0
  let maxID = 0;
  let ids = [];
  passes.forEach((pass) => {
    //initialize row to 0
    // console.log(pass.length);
    let row = 0;
    //set left and right pointers to 0 and 127
    let left = 0;
    let right = 127;
    //loop through from index 0 - 6
    for (let i = 0; i < 7; i++) {
      //calculate mid Math.floor((left + right)/2)
      let mid = Math.ceil((left + right) / 2);
      //if passes[i] = f -> right = mid
      if (pass[i] === "F") right = mid;
      //if paasses[i] = b -> left = mid
      if (pass[i] === "B") left = mid;
    }
    //row = left
    row = left;
    //initialize col to 0
    let col = 0;
    //reset left and right to 0 and 7
    left = 0;
    right = 7;
    //loop through index 7-9
    for (let i = 7; i < 10; i++) {
      //calculate mid Math.floor((left+ right)/2)
      let mid = Math.ceil((left + right) / 2);
      //if passes[i] = L -> right = mid
      if (pass[i] === "L") right = mid;
      //if passes[i] = R -> left = mid
      if (pass[i] === "R") left = mid;
    }
    //seat ID = row * 8 + col
    col = left;
    let currentId = row * 8 + col;
    ids.push(currentId);
    // console.log(row, col);
    //highestId = Math.max(current, highest)
    maxID = Math.max(currentId, maxID);
  });

  ids = ids.sort((a, b) => a - b);
  // console.log(ids.length);
  // return ids;
  return ids;
};

const missingSeat = (seats) => {
  let sumtotal = 0;
  for (let i = 48; i <= 818; i++) {
    sumtotal += i;
  }
  let seatSum = 0;
  seats.forEach((seat) => (seatSum += seat));

  return sumtotal - seatSum;
};

console.log(missingSeat(binaryBoard(input)));
