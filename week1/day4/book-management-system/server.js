const express = require("express");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const readerRoutes = require("./routes/readerRoutes");

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use("/admin", adminRoutes);
app.use("/reader", readerRoutes);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
