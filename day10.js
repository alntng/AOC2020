const { exampleOne, exampleTwo } = require("./day10test");

const fs = require("fs");
const input = fs
  .readFileSync("./day10input.txt")
  .toString()
  .split("\n")
  .map((num) => Number(num));
input.pop();

const adapters = input.sort((a, b) => a - b);

// console.log(input);

// const countJolts = (adapters) => {
//   //sort array
//   const sorted = adapters.sort((a, b) => a - b);
//   // console.log(sorted);
//   //initiliaze difference counter for 1 and 3 to 0
//   let oneDiff = 0;
//   let threeDiff = 0;

//   if (sorted[0] === 1) {
//     oneDiff++;
//   } else if (sorted[0] === 3) {
//     threeDiff++;
//   }
//   //loop through array, checking each pair of indecies
//   for (let i = 0; i < sorted.length - 1; i++) {
//     let diff = sorted[i + 1] - sorted[i];
//     //if difference is 1, increment 1 counter
//     if (diff === 1) {
//       oneDiff++;
//       //if difference is 3, increment 3 counter
//     } else if (diff === 3) {
//       threeDiff++;
//     } else if (diff === 2) {
//       console.log("Diff is 2");
//     }
//   }
//   //add 1 more to 3 counter to account for the built in adapter
//   threeDiff++;
//   //return both counts
//   return [oneDiff, threeDiff];
// };

// console.log(countJolts(input));

// const countArrangements = (adapters) => {
//   const sorted = adapters.sort((a, b) => a - b);
//   console.log(sorted);
//   let arrangements = 0;
//   let R = 1;
//   let L = 0;

//   while (R < sorted.length) {
//     //difference = sorted[R] - sorted[L]
//     const diff = sorted[R] - sorted[L];
//     if (diff >= 1 && diff <= 3) {
//       arrangements++;
//       console.log(`${diff} is between 1 and 3`);
//       console.log(sorted[L], sorted[R]);
//       R++;
//     } else if (diff > 3) {
//       console.log(`${diff} is greater than 3`);
//       console.log(sorted[L], sorted[R]);
//       let currentRight = R;
//       L = --currentRight;
//       // console.log("after reassining", sorted[L], sorted[R]);
//     }
//     console.log(`total arrangements: ${arrangements}`);
//     console.log("======");
//   }
//   console.log("finished while loop");
//   return arrangements;
// };

// console.log(countArrangements(exampleTwo));

const device = adapters[adapters.length - 1] + 3;

adapters.push(device);

const oneJolt = [];
const twoJolt = [];
const threeJolt = [];

let currJolt = 0;
adapters.forEach((adapter) => {
  if (currJolt + 1 === adapter) {
    currJolt++;
    oneJolt.push(adapter);
  }
  if (currJolt + 2 === adapter) {
    currJolt += 2;
    twoJolt.push(adapter);
  }
  if (currJolt + 3 === adapter) {
    currJolt += 3;
    threeJolt.push(adapter);
  }
});
console.log("part1", threeJolt.length * oneJolt.length);

adapters.unshift(0);
const possibleGuys = {};

possibleGuys[adapters[adapters.length - 1]] = 1;

for (let i = adapters.length - 2; i >= 0; i--) {
  possibleGuys[adapters[i]] = 0;
  for (let j = i + 1; j < adapters.length; j++) {
    if (adapters[j] - adapters[i] <= 3) {
      possibleGuys[adapters[i]] += possibleGuys[adapters[j]];
    }
  }
}

console.log("part2", possibleGuys[adapters[0]]);
