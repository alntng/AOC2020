const { last } = require("lodash");

const day15 = (nums) => {
  let seen = {};
  nums.forEach((num, i) => {
    seen[num] = i;
  });
  nums.push(0);

  for (let i = nums.length - 1; i < 6059; i++) {
    let lastSeen = seen[nums[i]];
    if (lastSeen !== undefined) {
      // console.log(i - lastSeen);
      nums.push(i - lastSeen);
      seen[nums[i]] = i;
    } else {
      nums.push(0);
      seen[nums[i]] = nums.length - 2;
    }
  }
  // console.log(Object.keys(seen).length);
  console.log(nums[(30000000 % 2020) - 1]);
};

// day15([16, 1, 0, 18, 12, 14, 19]);
// console.log(30000000 / 2020);

const starting = [16, 1, 0, 18, 12, 14, 19];

let spoken = new Map();
let justSpoke = 0;
for (let i = 0; i < 30000000; i++) {
  if (starting[i] || starting[i] === 0) {
    justSpoke = starting[i];
    spoken.set(justSpoke, i + 1);
  } else if (!spoken.has(justSpoke)) {
    spoken.set(justSpoke, i);
    justSpoke = 0;
  } else {
    // console.log(`just spoke ${justSpoke}`);
    let temp = spoken.get(justSpoke);
    // console.log("temp", temp);
    spoken.set(justSpoke, i);
    // console.log(i);
    // console.log("just set", spoken);
    justSpoke = i - temp;
    // console.log(`just spoke after ${justSpoke}`);
  }
  // console.log("=====");
}
console.log(justSpoke);
