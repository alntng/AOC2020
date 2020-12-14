const fs = require("fs");

const test = fs.readFileSync("./day13test.txt").toString().split("\n");
test.pop();

const input = fs.readFileSync("./day13input.txt").toString().split("\n");
input.pop();

const timeStamp = input[0];
let busesPartOne = test[1].split(",").filter((e) => {
  return e !== "x";
});
let busesPartTwo = test[1].split(",");

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
  console.log("bustimes", busTimes);
  let earliest = 100000;
  while (earliest) {
    // console.log(earliest);
    let isSubsequent = true;

    for (let i = 0; i < busTimes.length; i++) {
      if (busTimes[i] === "x") continue;
      // console.log("current time", earliest + i);
      // console.log("bustime", busTimes[i]);
      if ((earliest + i) % busTimes[i] !== 0) {
        // console.log(`modulo: ${(earliest + i) % busTimes[i]}`);
        isSubsequent = false;
      }
    }

    if (isSubsequent) {
      // console.log("breaking here");
      break;
    }
    if (!isSubsequent) {
      // console.log(`incrementing to ${earliest + 1}`);
      earliest++;
    }
    // console.log(`earliest: ${earliest}`);
  }
  return earliest;
};
// console.log(offset(input));

function minimumTimeStamp(busesWithX, buses) {
  console.log(`buses: ${buses}`);
  console.log(`buses with x: ${busesWithX}`);
  let tempTimeStamp = 0;
  let multiplicator = 1;
  let pairBusMinutes = buses.map((bus) => {
    return [bus, busesWithX.indexOf(bus)];
  });
  console.log(`pairsBusMinutes: ${pairBusMinutes}`);
  for (let i = 0; i < pairBusMinutes.length; i++) {
    let exit = false;
    while (!exit) {
      if (
        (tempTimeStamp + parseInt(pairBusMinutes[i][1])) %
          parseInt(pairBusMinutes[i][0]) ===
        0
      ) {
        exit = true;
        multiplicator *= parseInt(pairBusMinutes[i][0]);
        console.log("multiplicator:", multiplicator);
      } else {
        tempTimeStamp += multiplicator;
      }
    }
  }
  console.log(tempTimeStamp);
}
console.log("PART TWO:");
minimumTimeStamp(busesPartTwo, busesPartOne);
