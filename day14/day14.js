// const fs = require("fs");

// const test = fs.readFileSync("./day14test.txt").toString().split("\n");
// test.pop();

// const input = fs.readFileSync("./day14input.txt").toString().split("\n");
// input.pop();

// let twoBits = new Array(36).fill(0);
// for (let i = 36; i > 0; i--) {
//   twoBits[i - 1] = Math.pow(2, 36 - i);
// }

// const findBits = (num) => {
//   let bitNum = new Array(36).fill(0);
//   twoBits.forEach((bit, i) => {
//     if (num / bit >= 1) {
//       bitNum[i] = 1;
//       num -= bit;
//     }
//   });
//   return bitNum;
// };

// const findNum = (bits) => {
//   let num = 0;
//   bits.forEach((bit, i) => {
//     if (bit === 1) num += twoBits[i];
//   });
//   return num;
// };

// const issaBit = (program, mask) => {
//   let [index, value] = program.split(" = ");
//   index = Number(index.slice(4, -1));
//   value = findBits(value);

//   let result = new Array(36).fill(0);
//   result.map((num, i) => {
//     if (mask[i] === 0 || mask[i] === 1) {
//       result[i] = mask[i];
//     } else {
//       result[i] = value[i];
//     }
//   });
//   let newNum = findNum(result);
//   return [index, newNum];
// };

// const nonZeroes = (programs) => {
//   let mem = [];
//   let mask = [];
//   programs.forEach((program) => {
//     if (program[1] === "a") {
//       mask = program
//         .split(" = ")[1]
//         .split("")
//         .map((num) => {
//           if (num !== "X") {
//             return Number(num);
//           } else {
//             return num;
//           }
//         });
//     } else {
//       let [i, num] = issaBit(program, mask);
//       mem[i] = num;
//     }
//   });
//   console.log(mem.reduce((a, b) => a + b, 0));
// };

// nonZeroes(input);

const path = require("path");
const fs = require("fs");

const raw_input = fs
  .readFileSync(path.join(__dirname, "day14input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    // @example mask = 010X11X110X1101011101000001XX1000100
    // @example mem[25292] = 672982926
    if (line.includes("mask")) {
      let [, value] = /mask = (.+)$/.exec(line);
      return {
        type: "mask",
        value,
      };
    } else {
      let [, address, value] = /mem\[(\d+)\] = (\d+)/.exec(line);
      address = parseInt(address, 10);
      value = parseInt(value, 10);
      return {
        type: "write",
        address,
        value,
      };
    }
  });

// Process the input specifically for Part One
const input_part_one = raw_input.map((instruction) => {
  let { type, value } = instruction;
  if (type === "write") {
    // Convert the value to an array of 1s and 0s
    let binary_num_arr = value
      .toString(2)
      .padStart(36, "0")
      .split("")
      .map((v) => +v);
    return {
      ...instruction,
      value: binary_num_arr,
    };
  } else {
    return instruction;
  }
});

/**
 * @param {Array<String>} mask
 * @param {Array<Number>} num
 */
function applyMask(mask, num) {
  for (let i = 0; i < mask.length; i++) {
    let m = mask[i];
    if (m === "1") {
      num[i] = 1;
    } else if (m === "0") {
      num[i] = 0;
    }
  }
  return num;
}

function binaryArrayToDecimal(arr) {
  return parseInt(arr.join(""), 2);
}

function partOne(input) {
  let memory = {};
  let current_mask;
  for (line of input) {
    const { type, address, value } = line;
    if (type === "mask") {
      current_mask = value;
    } else {
      applyMask(current_mask, value);
      memory[address] = binaryArrayToDecimal(value);
    }
  }

  return Object.values(memory).reduce((a, b) => a + b, 0);
}

console.log("Part One:", partOne(input_part_one));

/////////////////

// Process the input specifically for Part Two
const input_part_two = raw_input.map((instruction) => {
  let { type, address } = instruction;
  if (type === "write") {
    // Convert the address to an array of 1s and 0s
    let address_as_binary_num_arr = address
      .toString(2)
      .padStart(36, "0")
      .split("")
      .map((v) => +v);
    return {
      ...instruction,
      address: address_as_binary_num_arr,
    };
  } else {
    return instruction;
  }
});

/**
 * @param {Array} val
 * @returns {Array<String>}
 */
function floatingToPossibilites(vals) {
  let pushed = false;
  let new_vals = [];
  for (let val of vals) {
    let x = val.indexOf("X");
    if (x > -1) {
      let a = `${val.slice(0, x)}0${val.slice(x + 1)}`;
      let b = `${val.slice(0, x)}1${val.slice(x + 1)}`;
      new_vals.push(a, b);
      pushed = true;
    }
  }

  if (pushed) {
    return floatingToPossibilites(new_vals);
  } else {
    return vals;
  }
}

function applyMaskOverMemoryAddress(mask, _address) {
  let address = _address.slice(0);
  for (let i = 0; i < mask.length; i++) {
    let m = mask[i];
    if (m === "1" || m === "X") {
      address[i] = m;
    }
  }

  return address.join("");
}

function partTwo(input) {
  let memory = {};
  let current_mask;
  for (line of input) {
    const { type, address, value } = line;
    if (type === "mask") {
      current_mask = value;
    } else {
      let masked_address = applyMaskOverMemoryAddress(current_mask, address);
      let current_addresses_to_write_to = floatingToPossibilites([
        masked_address,
      ]).map((a) => parseInt(a, 2));
      for (let addr of current_addresses_to_write_to) {
        memory[addr] = value;
      }
    }
  }

  return Object.values(memory).reduce((a, b) => a + b, 0);
}

console.log("Part Two:", partTwo(input_part_two));
