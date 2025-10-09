const { readTodos, writeTodos } = require("../models/todoModel");

// Get all todos
const getAllTodos = (req, res) => {
  const todos = readTodos();
  res.json(todos);
};

// Add a new todo
const addTodo = (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required!" });
  }

  const todos = readTodos();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: completed || false
  };

  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

// Search todos (partial & case-insensitive)
const searchTodos = (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Query parameter q is required" });

  const todos = readTodos();
  const results = todos.filter(todo =>
    todo.title.toLowerCase().includes(q.toLowerCase())
  );

  res.json(results);
};

// Update todo by ID
const updateTodo = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const todos = readTodos();

  const index = todos.findIndex(todo => todo.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  todos[index] = { ...todos[index], ...updatedData };
  writeTodos(todos);

  res.json(todos[index]);
};

// Delete todo by ID
const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todos = readTodos();

  const newTodos = todos.filter(todo => todo.id !== parseInt(id));
  if (newTodos.length === todos.length)
    return res.status(404).json({ message: "Todo not found" });

  writeTodos(newTodos);
  res.json({ message: "Todo deleted successfully" });
};

module.exports = {
  getAllTodos,
  addTodo,
  searchTodos,
  updateTodo,
  deleteTodo
};
