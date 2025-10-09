const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../db.json");

// Read tickets
function getTickets() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data).tickets;
}

// Write tickets
function saveTickets(tickets) {
  const db = { tickets };
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

module.exports = { getTickets, saveTickets };
