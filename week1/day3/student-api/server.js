const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = 3000;
const DB_FILE = "db.json";


function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ students: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}


function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post("/students", (req, res) => {
  const db = loadDB();
  const newStudent = req.body;

  if (!newStudent.name || !newStudent.course || !newStudent.batch) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  newStudent.id = db.students.length + 1;
  db.students.push(newStudent);
  saveDB(db);

  res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// ✅ GET /students → Fetch all students
app.get("/students", (req, res) => {
  const db = loadDB();
  res.json(db.students);
});


app.get("/students/:id", (req, res) => {
  const db = loadDB();
  const student = db.students.find((s) => s.id == req.params.id);
  if (student) res.json(student);
  else res.status(404).json({ message: "No students found" });
});


app.put("/students/:id", (req, res) => {
  const db = loadDB();
  const index = db.students.findIndex((s) => s.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "No students found" });

  db.students[index] = { ...db.students[index], ...req.body };
  saveDB(db);
  res.json({ message: "Student updated", student: db.students[index] });
});

app.delete("/students/:id", (req, res) => {
  const db = loadDB();
  const filtered = db.students.filter((s) => s.id != req.params.id);
  if (filtered.length === db.students.length)
    return res.status(404).json({ message: "No students found" });

  saveDB({ students: filtered });
  res.json({ message: "Student deleted successfully" });
});


app.get("/students/search", (req, res) => {
  const db = loadDB();
  const { course } = req.query;
  const result = db.students.filter(
    (s) => s.course.toLowerCase() === course.toLowerCase()
  );
  if (result.length === 0) return res.status(404).json({ message: "No students found" });
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
