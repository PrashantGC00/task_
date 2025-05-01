import React, { useState, useEffect } from "react";
import EmployeeRegister from "./Components/EmployeeRegister";
import EmployeeTable from "./Components/EmployeeTable";
import { useLoadingContext } from "../../utils/Context/LoadingContext";
import { motion } from "framer-motion";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const { loading } = useLoadingContext();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/employees`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        if (!response.ok) {
          console.log(result.message || "Failed to fetch employees");
        }
        setEmployees(result.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [loading]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col lg:flex-row lg:bg-primary-color">
      <motion.div
        className="w-full lg:w-1/3 p-4 h-screen flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, ease: "easeOut" }}
      >
        <EmployeeRegister />
      </motion.div>
      <motion.div
        className="w-full lg:w-2/3 bg-white"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ delay: 0.4, ease: "easeOut" }}
      >
        <EmployeeTable employees={employees} />
      </motion.div>
    </div>
  );
};

export default Employee;
