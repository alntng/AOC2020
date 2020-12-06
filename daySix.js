const fs = require("fs");
const input = fs
  .readFileSync("./daySixInput.txt")
  .toString()
  .split("\n")
  .toString()
  .split(",,");

const test = fs
  .readFileSync("./daySixTest.txt")
  .toString()
  .split("\n")
  .toString()
  .split(",,");

const yesCount = (groups) => {
  //initialize count to 0
  let count = 0;
  //loop through all groups
  groups.forEach((group) => {
    //create seen object
    const seen = {};
    //loop through each individual group
    for (let i = 0; i < group.length; i++) {
      let char = group[i];
      //if not already in the object , set count to 1
      //if already in, do nothing
      //add up total count in seen object not including commas
      if (char !== "," && !seen[char]) seen[char] = 1;
    }
    for (let char in seen) {
      //add that count to total
      count += seen[char];
    }
  });
  return count;
};

// console.log(test);
console.log(yesCount(input));
