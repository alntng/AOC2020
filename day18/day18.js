const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.join(__dirname, "day18input.txt"), "utf8")
  .split("\n");

console.log(input);
