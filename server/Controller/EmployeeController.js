const Employee = require("../Model/EmployeeModel");

const newEmployee = async (req, res) => {
  try {
    const { name, email, contact, department } = req.body;
    if (!name || !email || !contact || !department) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const employee = await Employee.findOne({ email });

    if (employee) {
      return res.status(409).send({
        success: false,
        message: "Employee already exists",
      });
    }

    const createdEmployee = new Employee({ name, email, contact, department });
    await createdEmployee.save();

    return res.status(201).send({
      success: true,
      message: "Employee added successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

const fetchEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No employees registered",
        data: [],
      });
    }

    return res.status(200).send({
      success: true,
      data: employees,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const _id = req.params._id;
    const employee = await Employee.findById(_id);

    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Employee not found",
      });
    }

    await employee.deleteOne();
    return res.status(200).send({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const _id = req.params._id;
    const employee = await Employee.findById(_id);

    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Employee does not exist",
      });
    }

    const { name, email, contact, department } = req.body;

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.contact = contact || employee.contact;
    employee.department = department || employee.department;

    await employee.save();

    return res.status(200).send({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  newEmployee,
  fetchEmployees,
  deleteEmployee,
  updateEmployee,
};
