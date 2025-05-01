import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";
import { Chip } from "@mui/material";
import { Popup } from "../PopUps/PopUp";
import { useLoadingContext } from "../../Context/LoadingContext";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Table = ({ employees: initialEmployees }) => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState(initialEmployees);
  const { toggleLoading } = useLoadingContext();

  useEffect(() => {
    setEmployees(initialEmployees);
  }, [initialEmployees]);

  const handleOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = async (_id) => {
    try {
      toggleLoading();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/employees/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to delete employee");
      } else {
        setEmployees(employees.filter(emp => emp._id !== _id));
        toast.success(result.message || "Employee deleted successfully");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting the employee");
    } finally {
      toggleLoading();
    }
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">No Employees Found</div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-start p-4 h-full">
      <Toaster position="top-center" />
      <div className="w-full max-w-6xl bg-white rounded-lg flex flex-col">
        <h1 className="text-2xl font-bold p-4 w-full text-center">
          Employee List
        </h1>

        <motion.div
          className="p-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {employees.map((employee) => (
            <motion.div
              key={employee._id}
              className="bg-white rounded-lg shadow mb-4 p-4"
              variants={childVariant}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg break-words whitespace-normal">
                  {employee.name}
                </h3>
                <Chip label={employee.department} size="small" color="primary" />
              </div>

              <div className="mb-2">
                <div className="text-sm text-gray-600">Email:</div>
                <div className="text-sm break-words whitespace-normal">
                  {employee.email}
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600">Contact:</div>
                <div className="text-sm break-words whitespace-normal">
                  {employee.contact}
                </div>
              </div>

              <div className="flex gap-2 mt-2 w-full justify-center">
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="bg-red-100 max-w-[150px] w-1/2 rounded-md px-2 py-1 text-red-800 hover:bg-red-200 transition duration-200 transform hover:scale-95 flex items-center justify-center text-sm"
                >
                  <DeleteOutlineIcon fontSize="small" className="mr-1" /> Delete
                </button>
                <button
                  className="bg-blue-100 max-w-[150px] w-1/2 rounded-md px-2 py-1 text-blue-800 hover:bg-blue-200 transition duration-200 transform hover:scale-95 flex items-center justify-center text-sm"
                  onClick={() => handleOpen(employee)}
                >
                  <EditIcon fontSize="small" className="mr-1" /> Edit
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedEmployee && (
        <Popup
          open={open}
          handleClose={handleClose}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default Table;
