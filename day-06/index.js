const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").trim();

const grid = input.split(/\r?\n/).map((lines) => lines.split(""));

const directions = {
  "^": [-1, 0],
  ">": [0, 1],
  "∨": [1, 0],
  "<": [0, -1],
};

let rows = grid.length;
let cols = grid[0].length;

let guardRow, guardCol, currentDirection;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (grid[i][j] in directions) {
      guardRow = i;
      guardCol = j;
      currentDirection = grid[i][j];
      break;
    }
  }
}

while (true) {
  const [dRow, dCol] = directions[currentDirection];
  const nextRow = guardRow + dRow;
  const nextCol = guardCol + dCol;

  // Check the boundaries
  if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
    break;
  }

  if (grid[nextRow][nextCol] === "#") {
    const currIndex = Object.keys(directions).indexOf(currentDirection);
    currentDirection = Object.keys(directions)[(currIndex + 1) % 4];
    continue;
  }

  guardRow = nextRow;
  guardCol = nextCol;

  if (grid[guardRow][guardCol] === "X") continue;

  grid[guardRow][guardCol] = "X";
}

console.log(grid.flat().filter((cell) => cell === "X").length);
