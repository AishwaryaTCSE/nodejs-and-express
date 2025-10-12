const express = require("express");
const bodyParser = require("body-parser");
require("./db"); // Import MongoDB connection
const Task = require("./models/Task");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const { status, dueDate } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (dueDate) filter.dueDate = new Date(dueDate);

        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
