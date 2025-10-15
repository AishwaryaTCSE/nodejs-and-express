const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", userRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
