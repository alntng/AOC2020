const fs = require("fs");
const input = fs.readFileSync("./day8input.txt").toString().split("\n");
input.pop();

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
    return inObject;
  }

  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

const findLoop = (instructions) => {
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
      idx++;
    } else if (action === "acc") {
      //if action = acc, acc += amount, pointer ++, seen = true
      accum += amount;
      idx++;
    } else if (action === "jmp") {
      idx += amount;
    }
    //if instructions[pointer].seen = true -> return acc
    if (idx >= instructions.length) break;
    if (instructions[idx].seen) {
      return 0;
    }
  }
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

    if (switched) outerAccum += findLoop(clone);
  }
  return outerAccum;
};

console.log(part2(input));
