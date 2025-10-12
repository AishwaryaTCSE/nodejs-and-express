const express = require("express");
const app = express();
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");

app.use(express.json());

connectDB();
app.use("/api", taskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
