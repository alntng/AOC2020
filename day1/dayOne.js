/*
Find the two numbers that add up to 2020 and then multiply by 2020

hashmap
*/
const fs = require("fs");
const input = fs
  .readFileSync("./dayOneInput.txt")
  .toString()
  .split("\n")
  .map((num) => Number(num));
// console.log(input);

const findSum = (nums) => {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const diff = 2020 - nums[i];
    const current = nums[i];
    if (!seen[current]) {
      seen[diff] = nums[i];
    } else if (seen[current]) {
      console.log(nums[i], diff);
      return nums[i] * diff;
    }
  }
};

// eslint-disable-next-line complexity
const threeSum = (nums) => {
  //sort array
  const sorted = nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    //initialize 3 pointers; 1st, 2nd and last idx of array
    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];
      if (sum === 2020) {
        //if 3 pointers sum up to 2020 -> push to results array
        console.log(`${sorted[i]} * ${sorted[left]} * ${sorted[right]}`);
        return sorted[i] * sorted[left] * sorted[right];
      } else if (sum < 2020) {
        //if < 2020 increment left
        left++;
      } else if (sum > 2020) {
        //if > 2020 decrement right
        right--;
      }
    }
  }
};

let test = [1721, 919, 366, 299, 675, 1456];

console.log(findSum(input));
