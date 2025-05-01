import React from "react";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { EmployeeSchema } from "../../../utils/Schemas/EmployeeSchema";
import { handleFailure, handleSuccess } from "../../../shared/toast";
import { DEPARTMENTS } from "../../../utils/Others/Departments";
import { useLoadingContext } from "../../../utils/Context/LoadingContext";

const EmployeeRegister = () => {
  const { loading, toggleLoading } = useLoadingContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      department: "",
    },
    validationSchema: EmployeeSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        toggleLoading();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/employees`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        if (!response.ok) {
          handleFailure(result.message || "Failed to register employee");
          return;
        }

        handleSuccess(result.message || "Employee registered successfully");
        resetForm();
      } catch (err) {
        handleFailure("An error occurred while registering the employee");
        console.error(err);
      } finally {
        toggleLoading();
      }
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-7 lg:fixed">
      <div className="text-4xl font-bold">Register Employee</div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-[100%] h-[50%] flex flex-col items-center gap-5"
      >
        <div className="w-[250px]">
          <TextField
            error={Boolean(formik.errors.name && formik.touched.name)}
            fullWidth
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            label="Name"
            onBlur={formik.handleBlur}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>
        <div className="w-[250px]">
          <TextField
            error={Boolean(formik.errors.email && formik.touched.email)}
            fullWidth
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            label="Email"
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="w-[250px]">
          <TextField
            error={Boolean(formik.errors.contact && formik.touched.contact)}
            fullWidth
            value={formik.values.contact}
            name="contact"
            onChange={formik.handleChange}
            label="Phone Number"
            onBlur={formik.handleBlur}
            helperText={formik.touched.contact && formik.errors.contact}
          />
        </div>
        <div className="w-[250px]">
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
            <FormHelperText>
              {formik.touched.department && formik.errors.department}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="w-[250px]">
          <Button
            className="h-[45px]"
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegister;
