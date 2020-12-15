const { last } = require("lodash");

const day15 = (nums) => {
  let seen = {};
  nums.forEach((num, i) => {
    seen[num] = i;
  });
  nums.push(0);

  for (let i = nums.length - 1; i < 2019; i++) {
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
  // console.log(seen);
  console.log(nums[2019]);
};

day15([16, 1, 0, 18, 12, 14, 19]);
