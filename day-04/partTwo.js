const fs = require("fs");

const matrix = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((line) => line.replace(/\r/g, "").split("")); // split lines into chars to make it a grid

const lenRow = matrix.length;
const lenCol = matrix[0].length;

const has_xmas = (i, j) => {
  const diagonal1 = matrix[i - 1][j - 1] + matrix[i + 1][j + 1];
  const diagonal2 = matrix[i - 1][j + 1] + matrix[i + 1][j - 1];

  if (
    (diagonal1 === "SM" || diagonal1 === "MS") &&
    (diagonal2 === "SM" || diagonal2 === "MS")
  ) {
    return true;
  }

  return false;
};

let count = 0;
for (i = 1; i < lenRow - 1; i++) {
  for (j = 1; j < lenCol - 1; j++) {
    const currChar = matrix[i][j];
    if (currChar == "A") {
      count += has_xmas(i, j);
    }
  }
}

console.log(count);
