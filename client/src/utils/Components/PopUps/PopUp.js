import React, { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { EmployeeSchema } from "../../Schemas/EmployeeSchema";
import toast, { Toaster } from "react-hot-toast";
import { DEPARTMENTS } from "../../Others/Departments";
import { useLoadingContext } from "../../Context/LoadingContext";

export const Popup = ({ open, handleClose, employee }) => {
  const [isChanged, setIsChanged] = useState(false);
  const { toggleLoading } = useLoadingContext();

  const handleSubmit = async (values, actions) => {
    try {
      toggleLoading();
      const response = await fetch(
        `/api/employees/${employee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to update employee");
      } else {
        toast.success(result.message || "Employee updated successfully");
        handleClose();
      }
    } catch (error) {
      toast.error("An error occurred while updating the employee");
    } finally {
      toggleLoading();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      contact: employee?.contact || "",
      department: employee?.department || "",
    },
    enableReinitialize: true,
    validationSchema: EmployeeSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const hasChanged =
      formik.values.name !== formik.initialValues.name ||
      formik.values.email !== formik.initialValues.email ||
      formik.values.contact !== formik.initialValues.contact ||
      formik.values.department !== formik.initialValues.department;

    setIsChanged(hasChanged);
  }, [formik.values, formik.initialValues]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-4 rounded-lg flex flex-col gap-9 w-[400px] h-auto"
      >
        <Toaster />
        <h2 className="text-xl font-bold text-center">Edit Employee</h2>

        <div>
          <TextField
            error={Boolean(formik.errors.name && formik.touched.name)}
            fullWidth
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            label="Name"
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-600">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <TextField
            error={Boolean(formik.errors.email && formik.touched.email)}
            fullWidth
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            label="Email"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <TextField
            error={Boolean(formik.errors.contact && formik.touched.contact)}
            fullWidth
            value={formik.values.contact}
            name="contact"
            onChange={formik.handleChange}
            label="Phone Number"
            onBlur={formik.handleBlur}
          />
          {formik.errors.contact && formik.touched.contact && (
            <p className="text-red-600">{formik.errors.contact}</p>
          )}
        </div>

        <div>
          <FormControl
            fullWidth
            error={Boolean(formik.errors.department && formik.touched.department)}
          >
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              value={formik.values.department}
              onBlur={formik.handleBlur}
              name="department"
              onChange={formik.handleChange}
            >
              {DEPARTMENTS.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.errors.department && formik.touched.department && (
            <p className="text-red-600">{formik.errors.department}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            disabled={formik.isSubmitting || !isChanged}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : "Update"}
          </Button>
          <Button variant="outlined" onClick={handleClose} fullWidth>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
};
