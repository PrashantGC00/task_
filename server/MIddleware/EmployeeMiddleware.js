const { employeeSchema, updateEmployeeSchema } = require('../Schema/EmployeeValidationSchema');

const validateNewEmployee = (req, res, next) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      success: false,
      message: "validation error",
    });
  }
  next();
};

const validateUpdateEmployee = (req, res, next) => {
  const { error } = updateEmployeeSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      success: false,
      message: "validation error",
    });
  }
  next();
};

module.exports = {
  validateNewEmployee,
  validateUpdateEmployee
};
