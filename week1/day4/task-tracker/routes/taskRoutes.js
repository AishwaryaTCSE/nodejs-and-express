const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  filterTasksByTag,
  addTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// Routes
router.get("/", getAllTasks);
router.get("/filter", filterTasksByTag);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
