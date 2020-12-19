//Solution Courtesy of https://github.com/romellem/advent-of-code/tree/eae86d488821293d918696ce4e008e5c5816aacb/2020/17
//

const {
  InfiniteNDimensionalGrid,
  ACTIVE,
} = require("./infiniteDimensionalGrid");

// let sample_grid = new InfiniteNDimensionalGrid({ intial_grid: [sampleInput], dimensions: 3 });
// sample_grid.run(6);

const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "day17input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const sampleInput = `.#.
..#
###`
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(""));

// let grid = new InfiniteNDimensionalGrid({
//   intial_grid: [input],
//   dimensions: 3,
// });
// grid.run(6);

// let active_cubes = grid.getValues(Object.keys(grid.grid))[ACTIVE];
// console.log(active_cubes);

let grid = new InfiniteNDimensionalGrid({
  intial_grid: [[input]],
  dimensions: 4,
});
grid.run(6);

let active_cubes = grid.getValues(Object.keys(grid.grid))[ACTIVE];
console.log(active_cubes);
