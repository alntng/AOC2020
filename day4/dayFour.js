/* eslint-disable no-loop-func */
/* eslint-disable max-statements */
const fs = require("fs");
const input = fs.readFileSync("./dayFourInput.txt").toString().split("\n");
const test = fs.readFileSync("./dayFourTest.txt").toString().split("\n");

// console.log(test);
// input.pop();

const resetPassport = () => {
  let passportKeys = {
    byr: { count: 1 },
    iyr: { count: 1 },
    eyr: { count: 1 },
    hgt: { count: 1 },
    hcl: { count: 1 },
    ecl: { count: 1 },
    pid: { count: 1 },
  };
  return passportKeys;
};

// eslint-disable-next-line complexity
const validatePassport = (passport) => {
  for (let key in passport) {
    if (passport[key].count === 1) {
      // console.log("count");
      return false;
    }
  }
  // console.log(passport.pid);
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;

  //byr (Birth Year) - four digits; at least 1920 and at most 2002.
  if (
    !byr.val ||
    byr.val.length < 4 ||
    Number(byr.val) < 1920 ||
    Number(byr.val) > 2002
  ) {
    // console.log("byr", byr);
    return false;
  }
  //iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  if (
    !iyr.val ||
    iyr.val.length < 4 ||
    Number(iyr.val) < 2010 ||
    Number(iyr.val) > 2020
  ) {
    // console.log("iyr", iyr);
    return false;
  }
  //eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  if (
    !eyr.val ||
    eyr.val.length < 4 ||
    Number(eyr.val) < 2020 ||
    Number(eyr.val) > 2030
  ) {
    // console.log("eyr", eyr);
    return false;
  }
  //hgt (Height) - a number followed by either cm or in:
  // If cm, the number must be at least 150 and at most 193.
  // If in, the number must be at least 59 and at most 76.
  let height = Number(hgt.val.slice(0, -2));
  let unit = hgt.val.slice(-2);
  if (unit === "cm") {
    if (height < 150 || height > 193) {
      // console.log("height cm");
      return false;
    }
  } else if (unit === "in") {
    if (height < 59 || height > 76) {
      // console.log("height in");
      return false;
    }
  }
  //hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  let invalidLetters = "ghijklmnopqrstuvwxyz".split("");
  if (hcl.val[0] === "#") {
    if (hcl.val.length !== 7) return false;
  } else if (hcl.val[0] !== "#") {
    // console.log("hcl; not a #");
    return false;
  }
  //ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  let eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  if (!eyeColors.includes(ecl.val)) {
    // console.log("ecl", ecl);
    return false;
  }
  //pid (Passport ID) - a nine-digit number, including leading zeroes.
  if (pid.val.length !== 9) {
    // console.log("pid", pid.val);
    return false;
  }

  return true;
};

const countValidPassports = (passports) => {
  let valid = 0;
  let found = resetPassport();

  for (let i = 0; i < passports.length; i++) {
    if (passports[i] !== "") {
      // console.log("Current Line", passports[i]);
      let credentials = passports[i].split(" ");

      // console.log(`Credentials: ${credentials}`);
      credentials.forEach((credential) => {
        // console.log(credential.split(":"));
        let [property, newVal] = credential.split(":");
        // console.log(`property: ${property} ; ${credential.split(":")[1]}`);
        if (found.hasOwnProperty(property)) {
          found[property].count--;
          found[property].val = newVal;
          // console.log(`${property}:${newVal}`);
        }
      });
    } else if (passports[i] === "") {
      // let isValid = true;
      // for (let key in found) {
      //   if (found[key].count === 1) isValid = false;
      // }
      if (validatePassport(found)) valid++;
      found = resetPassport();
    }
  }
  return valid;
};

console.log(countValidPassports(input));
