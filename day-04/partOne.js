const fs = require("fs");

const matrix = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((line) => line.replace(/\r/g, "").split("")); // split lines into chars to make it a grid

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // top
  [1, 1], // bottom-right
  [-1, -1], // top-left
  [1, -1], // bottom-left
  [-1, 1], // top-right
];

const str = "XMAS";
const lenRow = matrix.length;
const lenCol = matrix[0].length;

const has_xmas = (i, j, d) => {
  let [rowStep, colStep] = d;

  for (let k = 0; k < str.length; k++) {
    let newRow = i + k * rowStep;
    let newCol = j + k * colStep;

    if (newRow < 0 || newRow >= lenRow || newCol < 0 || newRow >= lenCol) {
      return false;
    }

    if (matrix[newRow][newCol] !== str[k]) {
      return false;
    }
  }
  return true;
};

let count = 0;
for (i = 0; i < lenRow; i++) {
  for (j = 0; j < lenCol; j++) {
    directions.forEach((direction) => {
      count += has_xmas(i, j, direction);
    });
  }
}
