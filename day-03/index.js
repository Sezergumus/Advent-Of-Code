const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");

// part 1's regex
// const regex = /mul\((\d+),(\d+)\)/g;

// part 2's regex
const regex = /(mul\((\d+),(\d+)\)|do\(\)|don\'t\(\))/g;

let total = 0;
let match;
let isEnabled = true;

while ((match = regex.exec(input)) !== null) {
  if (match[0] === "do()") {
    isEnabled = true;
  } else if (match[0] === "don't()") {
    isEnabled = false;
  } else if (match[1].startsWith("mul") && isEnabled) {
    const num1 = parseInt(match[2]);
    const num2 = parseInt(match[3]);

    total += num1 * num2;
  }
}
