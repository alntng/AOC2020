const fs = require("fs");
const input = fs.readFileSync("./day8input.txt").toString().split("\n");
input.pop();

const test = fs.readFileSync("./day8test.txt").toString().split("\n");
test.pop();

/**
 * acc increases or decreases a single global value called the accumulator by the value given in the argument. For example, acc +7 would increase the accumulator by 7. The accumulator starts at 0. After an acc instruction, the instruction immediately below it is executed next.
 ============
jmp jumps to a new instruction relative to itself. The next instruction to execute is found using the argument as an offset from the jmp instruction; for example, jmp +2 would skip the next instruction, jmp +1 would continue to the instruction immediately below it, and jmp -20 would cause the instruction 20 lines above to be executed next.
===========
nop stands for No OPeration - it does nothing. The instruction immediately below it is executed next.
 */

test.map((instruction, i) => {
  let index = {};
  let [action, amount] = instruction.split(" ");
  index.action = action;
  index.amount = Number(amount);
  index.seen = false;

  test[i] = index;
});

input.map((instruction, i) => {
  let index = {};
  let [action, amount] = instruction.split(" ");
  index.action = action;
  index.amount = Number(amount);
  index.seen = false;

  input[i] = index;
});

// console.log(test);

const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

const findLoop = (instructions) => {
  // console.log("clone length", instructions.length);
  //initialize accumulator to 0
  let accum = 0;
  //initialie pointer to 0
  let idx = 0;
  //loop through instructions
  while (idx < instructions.length) {
    const { action, amount, seen } = instructions[idx];
    instructions[idx].seen = true;
    if (action === "nop") {
      //if action = nop, acc++, pointer ++, seen = true
      // console.log("action is nop");
      idx++;
      // console.log("idx incremented:", idx);
      // console.log("accum incremented:", accum);
    } else if (action === "acc") {
      //if action = acc, acc += amount, pointer ++, seen = true
      // console.log("action is acc");
      accum += amount;
      idx++;
      // console.log("idx incremented:", idx);
      // console.log("accum stays the same:", accum);
    } else if (action === "jmp") {
      // console.log("action is jmp");
      //if action = jmp, pointer += amount, seen = true
      idx += amount;
      // console.log("idx incremented:", idx);
      // console.log("accum stays the same:", accum);
    }
    // console.log("============");
    //if instructions[pointer].seen = true -> return acc
    if (idx >= instructions.length) break;
    if (instructions[idx].seen) {
      // console.log("idx", idx);
      // console.log(accum);
      return 0;
    }
  }
  // console.log("reached outside");
  return accum;
};

const part2 = (instructions) => {
  //initialize outerAccum to 0
  let outerAccum = 0;
  //loop through instructions array
  for (let i = 0; i < instructions.length; i++) {
    //if instrictions[i].action = nop or jmp, switch to the other
    let clone = deepCopyFunction(instructions);

    let { action } = clone[i];
    let switched = false;
    if (action === "nop") {
      clone[i].action = "jmp";
      switched = true;
    } else if (action === "jmp") {
      clone[i].action = "nop";
      switched = true;
    }

    if (switched) {
      // console.log("switched something");
      //run findLoop on new instructions array
      // console.log("i", i);
      // console.log("clone", clone);
      outerAccum += findLoop(clone);
      //inifinite loops should return 0
      //single loop will return accum value
    }
  }
  return outerAccum;
};

console.log(part2(input));
