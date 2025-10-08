
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json()); 
const DB_FILE = "./db.json";

const readData = () => {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.post("/dishes", (req, res) => {
  try {
    const dishes = readData();
    const newDish = req.body;

    if (!newDish.name || !newDish.price || !newDish.category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    newDish.id = dishes.length ? dishes[dishes.length - 1].id + 1 : 1;
    dishes.push(newDish);
    writeData(dishes);

    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: "Failed to add dish" });
  }
});

app.get("/dishes", (req, res) => {
  try {
    const dishes = readData();
    res.status(200).json(dishes);
  } catch {
    res.status(500).json({ error: "Failed to read dishes" });
  }
});

app.get("/dishes/:id", (req, res) => {
  try {
    const dishes = readData();
    const dish = dishes.find((d) => d.id === parseInt(req.params.id));

    if (!dish) return res.status(404).json({ message: "Dish not found" });

    res.status(200).json(dish);
  } catch {
    res.status(500).json({ error: "Failed to fetch dish" });
  }
});

app.put("/dishes/:id", (req, res) => {
  try {
    const dishes = readData();
    const id = parseInt(req.params.id);
    const index = dishes.findIndex((d) => d.id === id);

    if (index === -1)
      return res.status(404).json({ message: "Dish not found" });

    dishes[index] = { ...dishes[index], ...req.body };
    writeData(dishes);
    res.status(200).json(dishes[index]);
  } catch {
    res.status(500).json({ error: "Failed to update dish" });
  }
});

app.delete("/dishes/:id", (req, res) => {
  try {
    const dishes = readData();
    const id = parseInt(req.params.id);
    const filtered = dishes.filter((d) => d.id !== id);

    if (filtered.length === dishes.length)
      return res.status(404).json({ message: "Dish not found" });

    writeData(filtered);
    res.status(200).json({ message: "Dish deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete dish" });
  }
});

app.get("/dishes/get", (req, res) => {
  try {
    const { name } = req.query;
    if (!name)
      return res.status(400).json({ error: "Please provide a dish name" });

    const dishes = readData();
    const searchTerm = name.toLowerCase();
    const result = dishes.filter((d) =>
      d.name.toLowerCase().includes(searchTerm)
    );

    if (result.length === 0)
      return res.status(404).json({ message: "No dishes found" });

    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Failed to search dishes" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
