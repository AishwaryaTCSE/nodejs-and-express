const Task = require("../models/task.model");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Check for duplicate title
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return res.status(400).json({ message: "Task title must be unique" });
    }

    const task = await Task.create({ title, description, priority, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Tasks
const getTasks = async (req, res) => {
  try {
    const { priority, isCompleted } = req.query;
    let filter = {};
    if (priority) filter.priority = priority;
    if (isCompleted) filter.isCompleted = isCompleted === "true";

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, isCompleted } = req.body;

    let updateData = { title, description, priority };
    if (isCompleted === true) {
      updateData.isCompleted = true;
      updateData.completionDate = new Date();
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Tasks by Priority
const deleteTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.query;
    if (!priority) return res.status(400).json({ message: "Priority filter required" });

    const result = await Task.deleteMany({ priority });
    res.status(200).json({ message: `${result.deletedCount} task(s) deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTasksByPriority,
};
