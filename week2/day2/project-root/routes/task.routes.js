const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTasksByPriority } = require("../controllers/task.controller");
const { validateTask } = require("../middleware/task.middleware");

// Create Task
router.post("/tasks", validateTask, createTask);

// Get Tasks
router.get("/tasks", getTasks);

// Update Task
router.patch("/tasks/:id", validateTask, updateTask);

// Delete Tasks by Priority
router.delete("/tasks", deleteTasksByPriority);

module.exports = router;
