const fs = require("fs");

// going to use the input for both parts since the input doesn't change
const numbers = fs
  .readFileSync("./input.txt", "utf8") // read file
  .replace(/\r/g, "") // normalize line endings
  .split("\n") // split into lines
  .map((line) => line.split(/\s+/)) // split lines by whitespace
  .reduce(([arr1, arr2], [col1, col2]) => { // split numbers to columns
    arr1.push(col1);
    arr2.push(col2);
    return [arr1, arr2];
  }, [[], []]) 
  .map(arr => arr.sort((a,b) => a - b)) // sorting lists

// part 1 answer (1882714)
let sum = numbers[0].reduce((acc, val, i) => acc + Math.abs(val- numbers[1][i]), 0);

// part 2 answer (19437052)
let prod = 0;

// mapping count of numbers in second array
const countMap = numbers[1].reduce((map, num) => {
  map[num] = (map[num] || 0) + 1;
  return map;
}, {})

for (const num of numbers[0]){
  if(countMap[num]) {
    prod += num * countMap[num];
  }
}