/* eslint-disable complexity */
const fs = require("fs");

const input = fs.readFileSync("./day12input.txt").toString().split("\n");
input.pop();

const test = fs.readFileSync("./day12test.txt").toString().split("\n");
test.pop();

const manhattanDistance = (actions) => {
  let distance = {
    east: 0,
    north: 0,
    direction: ["E", 180],
  };

  const rotate = (rotation, degree) => {
    const compass = {
      0: "W",
      90: "N",
      180: "E",
      270: "S",
    };

    const oldDegree = distance.direction[1];

    let [currDirection, currDegree] = distance.direction;
    if (rotation === "L") {
      currDegree -= degree;
    } else if (rotation === "R") {
      currDegree += degree;
    }

    if (currDegree <= -1) {
      currDegree = 360 + currDegree;
    } else if (currDegree >= 360) {
      currDegree = currDegree - 360;
    }

    let newDirection = compass[currDegree];

    distance = { ...distance, direction: [newDirection, currDegree] };
  };

  for (let i = 0; i < actions.length; i++) {
    let direction = actions[i][0];
    let value = Number(actions[i].slice(1));

    if (direction === "F") {
      direction = distance.direction[0];
    }

    if (direction === "E") distance.east += value;
    if (direction === "W") distance.east -= value;
    if (direction === "N") distance.north += value;
    if (direction === "S") distance.north -= value;
    if (direction === "L" || direction === "R") {
      rotate(direction, value);
    }
  }

  return Math.abs(distance.east) + Math.abs(distance.north);
};

console.log(manhattanDistance(input));
// console.log(test);
