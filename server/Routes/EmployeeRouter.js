const express = require("express");
const router = express.Router();
const {
  newEmployee,
  fetchEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../Controller/EmployeeController");
const {
  validateNewEmployee,
  validateUpdateEmployee,
} = require("../MIddleware/EmployeeMiddleware")

router.post("/employees",validateNewEmployee, newEmployee);
router.get("/employees", fetchEmployees);
router.delete("/employees/:_id", deleteEmployee);
router.put("/employees/:_id",validateUpdateEmployee, updateEmployee);

module.exports = router;
