const fs = require("fs");
const input = fs.readFileSync("./day7input.txt").toString().split("\n");
input.pop();
// console.log(input);
// console.log(input.length);

const test = fs.readFileSync("./day7test.txt").toString().split("\n");
test.pop();
// console.log(test);

// class Graph {
//   constructor() {
//     this.AdjList = new Map();
//   }
//   addVertex(color) {
//     this.AdjList.set(color, []);
//   }
//   addEdge(color, contained) {
//     this.AdjList.get(color).push(contained);
//   }
// }

// let Example = new Graph();
// test.forEach((rule) => {
//   let [color, contained] = rule.split("contain");
//   color = color.slice(0, -6);
//   contained = contained
//     .toString()
//     .split(",")
//     .map((color) => {
//       return color.slice(1);
//     });
//   // console.log(color, contained);
//   Example.addVertex(color);

//   contained.forEach((set) => {
//     let [qty, color1, color2, bags] = set.split(" ");

//     if (`${color1}` !== "other") {
//       Example.addEdge(color, `${color1} ${color2}`);
//     }
//     // console.log(qty, color1, color2, bags);
//   });
// });

// const search = (graph, targetColor) => {
//   const containsTarget = [];
//   let count = 0;

//   const hasCommonElements = (arr1, arr2) => {
//     return arr1.some((item) => arr2.includes(item));
//   };

//   const dfs = (color) => {
//     // const adjList = graph.AdjList.get(color);
//     // // console.log(`${color} : ${adjList}`);
//     // if (adjList.length === 0) return;
//     // if (
//     //   (adjList.includes(targetColor) ||
//     //     hasCommonElements(adjList, containsTarget)) &&
//     //   !containsTarget.includes(color)
//     // ) {
//     //   containsTarget.push(color);
//     //   // console.log(containsTarget);
//     //   // console.log("======");
//     //   return;
//     // }

//     // const stack = [color];
//     // adjList.forEach((rule) => stack.push(rule));
//     // // console.log("Stack", stack);
//     // let current = stack.pop();
//     // // console.log("current", current);
//     // while (stack.length > 0) {
//     //   dfs(current);
//     //   current = stack.pop();
//     //   // console.log("newCurrent", current);
//     // }

//     let bags = graph.AdjList.get(color);
//     if (bags.length === 0) return false;
//     if (bags.includes(targetColor)) return true;

//     bags.forEach((bag) => {
//       console.log(color, bag);
//       console.log("dfs bag", dfs(bag));
//       if (dfs(bag)) {
//         return true;
//       }
//     });

//     return false;
//   };

//   const colorIter = graph.AdjList.keys();
//   let currentColor = colorIter.next().value;

//   while (currentColor) {
//     // count += dfs(currentColor) ? 1 : 0;
//     console.log(currentColor);
//     console.log(dfs(currentColor));
//     if (dfs(currentColor)) {
//       count++;
//       console.log(currentColor);
//     }
//     currentColor = colorIter.next().value;
//   }
//   // console.log(count);
// };

// search(Example, "shiny gold");

let count = 0;
let bags = {};

// collect bags in format: { 'dim red' : [ 'bright gold', 'striped fuchsia' ] }
for (const line of input) {
  // split bag types after outer bag type
  let innerBagTypes = line.replace(/.*?bags/, "").split(",");
  // trim to just bag name
  innerBagTypes = innerBagTypes.map((x) =>
    x
      .replace(/.*\d /, "")
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/(bags|bag)/, "")
      .trim()
  );
  // set object at outer bag type
  bags[line.replace(/bags.*/, "").trim()] = innerBagTypes;
}

function checkBagContainsGold(bags, bag) {
  // bag does not contain anything
  if (!bags[bag]) {
    return false;
  }
  // bag contains gold directly
  if (bags[bag].includes("shiny gold")) {
    return true;
  }
  // check inner bags
  for (const innerBag of bags[bag]) {
    // check if inner bag contains gold bag
    if (checkBagContainsGold(bags, innerBag)) {
      return true;
    }
  }
  // none of the inner bags contain gold
  return false;
}

for (const bag in bags) {
  // add 1 for each bag containing gold
  count += checkBagContainsGold(bags, bag) ? 1 : 0;
}

console.log(count);

bags = {};

// collect bags in format: { 'dim red' : [ [2, 'bright gold'], [5, 'striped fuchsia'] ] }
for (const line of input) {
  // split bag types after outer bag type
  let innerBagTypes = line.replace(/.*?bags/, "").split(",");
  // trim to just [number, bag name]
  innerBagTypes = innerBagTypes.map((x) => [
    Number(x.replace(/[^\d]+/g, "")),
    x
      .replace(/.*\d /, "")
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/(bags|bag)/, "")
      .trim(),
  ]);
  // set object at outer bag type
  bags[line.replace(/bags.*/, "").trim()] = innerBagTypes;
}

// count inner bags
function countInnerBags(bags, bag) {
  // if does not contain any bags
  if (!bags[bag]) {
    return 0;
  }
  // count inner bags
  let innerBags = 0;
  for (const innerBag of bags[bag]) {
    // add innerBag[0] for number of current inner bag
    // plus innerBag[0] * the number of bags in the inner bag
    innerBags += innerBag[0] + innerBag[0] * countInnerBags(bags, innerBag[1]);
  }
  // return inner bags
  return innerBags;
}
console.log(
  "Bags inside a shiny gold bag: ",
  countInnerBags(bags, "shiny gold")
);
