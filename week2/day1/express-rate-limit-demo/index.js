// index.js
const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");

// ✅ Middleware for parsing JSON
app.use(express.json());

// ✅ Use API routes
app.use("/api", apiRoutes);

// ✅ Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// ✅ Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
