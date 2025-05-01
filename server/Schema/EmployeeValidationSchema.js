const Joi = require('joi');

const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  contact: Joi.string().min(10).max(10).required(),
  department: Joi.string().valid(
    "Development",
    "UI/UX",
    "QA",
    "Project Management",
    "HR"
  ).required(),
});

const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  contact: Joi.string().min(10).max(10),
  department: Joi.string().valid(
    "Development",
    "UI/UX",
    "QA",
    "Project Management",
    "HR"
  ).required(),
});

module.exports = {
  employeeSchema,
  updateEmployeeSchema
};
