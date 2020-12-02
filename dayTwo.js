const fs = require("fs");
const input = fs.readFileSync("./dayTwoInput.txt").toString().split("\n");
input.pop();
// console.log(input);

const countValidPasswords = (passwords) => {
  //initilialize count of valid passwords
  let count = 0;
  //loop through each password and evaluate
  passwords.forEach((password) => {
    //find out rules for each password => min , max of letter
    let rules = password.split(":");
    let char = rules[0].slice(-1);
    let limits = rules[0].slice(0, -1).split("-");
    let min = Number(limits[0]);
    let max = Number(limits[1]);
    let string = rules[1].trim();
    //check if password meets criteria
    //loop through string and increment for each letter
    let charCount = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i] === char) charCount++;
    }

    //if char's count is in between min and max => increment count
    if (charCount >= min && charCount <= max) count++;
    //increment if so
    //skip if not
    // console.log(`Char:${char} ; Min:${min} ; Max:${max} ; String:${string}`);
  });
  return count;
};

console.log(input.length);
console.log(countValidPasswords(input));
