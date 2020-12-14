const fs = require("fs");

const test = fs.readFileSync("./day14test.txt").toString().split("\n");
test.pop();

const input = fs.readFileSync("./day14input.txt").toString().split("\n");
input.pop();
// console.log(input);
let twoBits = new Array(36).fill(0);
for (let i = 36; i > 0; i--) {
  twoBits[i - 1] = Math.pow(2, 36 - i);
}

const findBits = (num) => {
  let bitNum = new Array(36).fill(0);
  twoBits.forEach((bit, i) => {
    if (num / bit >= 1) {
      bitNum[i] = 1;
      num -= bit;
    }
  });
  return bitNum;
};

const findNum = (bits) => {
  let num = 0;
  bits.forEach((bit, i) => {
    if (bit === 1) num += twoBits[i];
  });
  return num;
};

const issaBit = (program, mask) => {
  let [index, value] = program.split(" = ");
  index = Number(index.slice(4, -1));
  value = findBits(value);

  let result = new Array(36).fill(0);
  result.map((num, i) => {
    if (mask[i] === 0 || mask[i] === 1) {
      result[i] = mask[i];
    } else {
      result[i] = value[i];
    }
  });
  let newNum = findNum(result);
  return [index, newNum];
};

const nonZeroes = (programs) => {
  let mem = [];
  let mask = [];

  programs.forEach((program) => {
    if (program[1] === "a") {
      mask = program
        .split(" = ")[1]
        .split("")
        .map((num) => {
          if (num !== "X") {
            return Number(num);
          } else {
            return num;
          }
        });
      // console.log(mask);
    } else {
      let [i, num] = issaBit(program, mask);
      mem[i] = num;
    }
  });

  let sum = mem.reduce((a, b) => a + b, 0);
  console.log(sum);
};

nonZeroes(input);
