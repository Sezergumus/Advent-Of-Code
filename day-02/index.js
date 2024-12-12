const fs = require("fs");

let safeReports = 0;

const reports = fs
  .readFileSync("./input.txt", "utf8") // read file
  .replace(/\r/g, "") // normalize line endings
  .split("\n") // split into lines
  .map((report) => report.split(/\s+/).map((num) => parseInt(num)));

function isSafe(report) {
  let isIncreasing = null;
  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (Math.abs(diff) > 3 || diff === 0) {
      return false;
    }

    if (diff > 0) {
      if (isIncreasing === false) return false;
      isIncreasing = true;
    } else if (diff < 0) {
      if (isIncreasing === true) return false;
      isIncreasing = false;
    }
  }
  return true;
}

reports.forEach((report) => {
  // part one
  if (isSafe(report)) {
    safeReports++;
    return;
  }

  // part two
  for (let i = 0; i < report.length; i++) {
    const newReport = [...report.slice(0, i), ...report.slice(i + 1)];

    if (isSafe(newReport)) {
      safeReports++;
      return;
    }
  }
});
