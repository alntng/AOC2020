const fs = require("fs");
const input = fs
  .readFileSync("./day16Input.txt")
  .toString()
  .split("\n")
  .toString()
  .split(",,");

let ticketRules = new Set();
input[0].split(",").map((rule) => {
  let [key, ranges] = rule.split(":");
  let [lower, upper] = ranges.slice(1).split(" or ");

  let [lowerMin, lowerMax] = lower.split("-");

  for (let i = Number(lowerMin); i <= Number(lowerMax); i++) {
    if (!ticketRules.has(i)) ticketRules.add(i);
  }

  let [upperMin, upperMax] = upper.split("-");
  for (let i = Number(upperMin); i <= Number(upperMax); i++) {
    if (!ticketRules.has(i)) ticketRules.add(i);
  }
});

let errorRate = 0;

let missing = input[2].split(":")[1].split(",");
missing.shift();
missing.pop();
missing = missing.map((num) => {
  return Number(num);
});

missing.forEach((num) => {
  if (!ticketRules.has(num)) errorRate += num;
});

console.log(errorRate);
