const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").trim();

const [rulesSection, updatesSection] = input.split(/\r?\n\r?\n/);

const rules = rulesSection
  .split("\n")
  .map((rule) => rule.split("|").map(Number));

const updates = updatesSection
  .split("\n")
  .map((update) => update.split(",").map(Number));

const graph = {};
rules.forEach(([from, to]) => {
  if (!graph[from]) graph[from] = [];
  if (!graph[to]) graph[to] = [];
  graph[from].push(to);
});

console.log(graph);

// variable for part two
const invalidUpdates = [];

const isValidOrder = (update, graph) => {
  const visited = new Set();

  for (let i = 0; i < update.length; i++) {
    const current = update[i];

    if (graph[current]) {
      for (const dependency of graph[current]) {
        if (visited.has(dependency)) {
          invalidUpdates.push(update);
          return false;
        }
      }
    }
    visited.add(current);
  }
  return true;
};

let sumOfMiddles = 0;

updates.forEach((update) => {
  if (isValidOrder(update, graph)) {
    const middlePage = update[Math.floor(update.length / 2)];
    sumOfMiddles += middlePage;
  }
});
