const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.join(__dirname, "day17input.txt"), "utf8")
  .split("\n")
  .map((line) => line.split(""));
input.pop();

const emptyGrid = fs
  .readFileSync(path.join(__dirname, "emptyGrid.txt"), "utf8")
  .split("\n")
  .map((line) => line.split(""));
emptyGrid.pop();

let cube = [input];

//[z][x][y]
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

const checkNeighbors = (cube, z, x, y) => {};

for (let i = 0; i < 2; i++) {
  //add empty layer in front of and behind of cube as buffer
  cube.unshift(emptyGrid);
  cube.push(emptyGrid);
  //loop through each layer ([z])
  for (let z = 0; z < cube.length; z++) {
    console.log(cube[z]);
    //loop through each row
    for (let x = 0; x < cube[0].length; x++) {
      //loop through each [row][col]
      for (let y = 0; y < cube[0][0].length; y++) {
        if (cube[z][x][y] === "#") count++;
      }
    }
  }
  //if current cell is active and 2 or 3 active neighbors, stay active
  //or change to inactive
  //if inactive, and 3 neighbors are active, chance to active
}
// console.log(count);
//initialize active count to 0
//loop through each layer ([z])
//loop through each row
//loop through each [row][col]
//if active, increment count
