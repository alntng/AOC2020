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
    const compass = { 0: "W", 90: "N", 180: "E", 270: "S" };

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

const part2 = (actions) => {
  let ship = {
    east: 0,
    north: 0,
  };

  let waypoint = {
    E: 10,
    N: 1,
  };

  const rotate = (rotation, degree) => {
    let newWayPoints = {};

    const compassVal = { 0: "W", 90: "N", 180: "E", 270: "S" };
    const compassNum = { W: 0, N: 90, E: 180, S: 270 };

    Object.keys(waypoint).map((direction) => {
      let directionNum = compassNum[direction];

      if (rotation === "L") {
        directionNum -= degree;
      } else if (rotation === "R") {
        directionNum += degree;
      }

      if (directionNum <= -1) {
        directionNum = 360 + directionNum;
      } else if (directionNum >= 360) {
        directionNum = directionNum - 360;
      }

      let newDirection = compassVal[directionNum];
      let newVal = waypoint[direction];

      if (newDirection === "W") {
        newDirection = "E";
        newVal = newVal * -1;
      }

      if (newDirection === "S") {
        newDirection = "N";
        newVal = newVal * -1;
      }

      newWayPoints[newDirection] = newVal;
    });

    return newWayPoints;
  };

  for (let i = 0; i < actions.length; i++) {
    let direction = actions[i][0];
    let value = Number(actions[i].slice(1));
    // console.log(direction, value);

    if (direction === "F") {
      console.log("adding");
      ship.east += value * waypoint.E;
      ship.north += value * waypoint.N;
    }

    if (direction === "N") waypoint.N += value;
    if (direction === "S") waypoint.N -= value;
    if (direction === "E") waypoint.E += value;
    if (direction === "W") waypoint.E -= value;

    if (direction === "L" || direction === "R") {
      console.log(direction, value);
      console.log("Before", waypoint);
      waypoint = rotate(direction, value);
      console.log("After", waypoint);
    }
  }
  return Math.abs(ship.east) + Math.abs(ship.north);
};

console.log(part2(input));
// console.log(test);
