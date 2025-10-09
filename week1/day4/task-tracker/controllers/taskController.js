const { loadTasks, saveTasks } = require("../models/taskModel");

const getAllTasks = (req, res) => {
  const db = loadTasks();
  res.status(200).json(db.tasks);
};

const filterTasksByTag = (req, res) => {
  const { tag } = req.query;
  if (!tag) return res.status(400).json({ message: "Tag query parameter is required" });

  const db = loadTasks();
  const filtered = db.tasks.filter(task => task.tag.toLowerCase() === tag.toLowerCase());

  res.status(200).json(filtered);
};

const addTask = (req, res) => {
  const { title, description, tag, priority, status } = req.body;
  if (!title || !description || !tag || !priority || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const db = loadTasks();
  const newTask = {
    id: Date.now(),
    title,
    description,
    tag,
    priority,
    status
  };

  db.tasks.push(newTask);
  saveTasks(db);

  res.status(201).json({ message: "Task added successfully", task: newTask });
};

// PUT /tasks/:id - update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const db = loadTasks();
  const task = db.tasks.find(t => t.id == id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  Object.assign(task, updates);
  saveTasks(db);

  res.status(200).json({ message: "Task updated successfully", task });
};


const deleteTask = (req, res) => {
  const { id } = req.params;

  const db = loadTasks();
  const index = db.tasks.findIndex(t => t.id == id);

  if (index === -1) return res.status(404).json({ message: "Task not found" });

  db.tasks.splice(index, 1);
  saveTasks(db);

  res.status(200).json({ message: "Task deleted successfully" });
};

module.exports = { getAllTasks, filterTasksByTag, addTask, updateTask, deleteTask };
