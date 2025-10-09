const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const roleCheck = require("../middlewares/roleCheckMiddleware");


router.get("/", roleCheck(["admin", "hr"]), getAllEmployees);
router.post("/", roleCheck(["admin"]), addEmployee);
router.put("/:id", roleCheck(["admin", "hr"]), updateEmployee);
router.delete("/:id", roleCheck(["admin"]), deleteEmployee);

module.exports = router;
