const fs = require("fs");
const path = require("path");

const TASKS_FILE = path.join(__dirname, "../tasks.json");

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify({ tasks: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(TASKS_FILE, "utf-8"));
}

function saveTasks(data) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(data, null, 2));
}

module.exports = { loadTasks, saveTasks };
