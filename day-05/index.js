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

let correctedSumOfMiddles = 0;

const topologicalSort = (update, graph) => {
  const inDegree = {};
  const result = [];
  const queue = [];

  update.forEach((node) => {
    inDegree[node] = 0;
  });

  update.forEach((node) => {
    if (graph[node]) {
      graph[node].forEach((neighbor) => {
        if (inDegree[neighbor] !== undefined) {
          inDegree[neighbor] += 1;
        }
      });
    }
  });

  update.forEach((node) => {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  });

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    if (graph[current]) {
      graph[current].forEach((neighbor) => {
        if (inDegree[neighbor] !== undefined) {
          inDegree[neighbor] -= 1;

          if (inDegree[neighbor] === 0) {
            queue.push(neighbor);
          }
        }
      });
    }
  }

  if (result.length === update.length) {
    return result;
  } else {
    throw new Error("Topological sort failed. Graph contains a cycle.");
  }
};

invalidUpdates.forEach((update) => {
  const sortedUpdate = topologicalSort(update, graph);

  const middlePage = sortedUpdate[Math.floor(sortedUpdate.length / 2)];
  correctedSumOfMiddles += middlePage;
});
