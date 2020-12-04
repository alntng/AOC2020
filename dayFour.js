const fs = require("fs");
const input = fs.readFileSync("./dayFourInput.txt").toString().split("\n");
const test = fs.readFileSync("./dayFourTest.txt").toString().split("\n");

// console.log(test);
// input.pop();

const resetPassport = () => {
  let passportKeys = {
    byr: 1,
    iyr: 1,
    eyr: 1,
    hgt: 1,
    hcl: 1,
    ecl: 1,
    pid: 1,
  };
  return passportKeys;
};

const countValidPassports = (passports) => {
  //initialize object with required keys each with value 1
  let valid = 0;
  let found = resetPassport();
  //loop through input input
  for (let i = 0; i < passports.length; i++) {
    //if index isnt empty string, seperate on space
    if (passports[i] !== "") {
      console.log("Current Line", passports[i]);
      let credentials = passports[i].split(" ");
      //loop each index and split on ':', if passport[0] is found in required, decrement count
      console.log(`Credentials: ${credentials}`);
      credentials.forEach((credential) => {
        let property = credential.split(":")[0];
        if (found.hasOwnProperty(property)) found[property]--;
      });
    } else if (passports[i] === "") {
      //if index is a '', reinitialize object with each count at 1
      // console.log(`Found: ${found}`);
      let isValid = true;
      for (let key in found) {
        if (found[key] === 1) {
          console.log(found[key], key);
          isValid = false;
        }
      }
      if (isValid) valid++;
      found = resetPassport();
    }
  }
  return valid;
};

console.log(countValidPassports(input));
