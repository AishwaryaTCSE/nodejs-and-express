const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");

app.use(express.json());
app.use(loggerMiddleware); 

app.use("/employees", employeeRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
