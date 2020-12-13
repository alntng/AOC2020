const fs = require("fs");

const test = fs.readFileSync("./day13test.txt").toString().split("\n");
test.pop();

const input = fs.readFileSync("./day13input.txt").toString().split("\n");
input.pop();

// console.log(test);

const busTime = (schedule) => {
  let earliest = Number(schedule[0]);
  let busIds = schedule[1]
    .split(",")
    .filter((num) => num !== "x")
    .map((num) => Number(num));
  // console.log(busIds);

  let departTime = earliest;
  let boardedBus = -1;

  while (departTime) {
    busIds.forEach((id) => {
      if (departTime % id === 0) boardedBus = id;
    });
    if (boardedBus > -1) break;
    departTime++;
  }
  return (departTime - earliest) * boardedBus;
};

const offset = (schedule) => {
  let busTimes = schedule[1].split(",").map((num) => {
    return num === "x" ? "x" : Number(num);
  });
  console.log(busTimes);
};
console.log(offset(test));
