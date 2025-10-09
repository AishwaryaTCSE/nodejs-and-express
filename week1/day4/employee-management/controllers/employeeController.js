const { loadDB, saveDB } = require("../models/employeeModel");

// GET /employees
const getAllEmployees = (req, res) => {
  const db = loadDB();
  res.status(200).json(db.employees);
};

// POST /employees (Admin only)
const addEmployee = (req, res) => {
  const { name, position, department, salary, status } = req.body;

  if (!name || !position || !department || !salary || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const db = loadDB();
  const newEmployee = {
    id: Date.now(),
    name,
    position,
    department,
    salary,
    status,
  };

  db.employees.push(newEmployee);
  saveDB(db);

  res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
};

// PUT /employees/:id (Admin or HR)
const updateEmployee = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const db = loadDB();
  const employee = db.employees.find((e) => e.id == id);

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  Object.assign(employee, updates);
  saveDB(db);

  res.status(200).json({ message: "Employee updated successfully", employee });
};

//DELETE /employees/:id 
const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const db = loadDB();
  const index = db.employees.findIndex((e) => e.id == id);

  if (index === -1) return res.status(404).json({ message: "Employee not found" });

  db.employees.splice(index, 1);
  saveDB(db);

  res.status(200).json({ message: "Employee deleted successfully" });
};

module.exports = { getAllEmployees, addEmployee, updateEmployee, deleteEmployee };
