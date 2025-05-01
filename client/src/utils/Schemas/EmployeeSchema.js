import * as yup from "yup";
import { DEPARTMENTS } from "../Others/Departments";

export const EmployeeSchema = yup.object().shape({
  name: yup.string().required("Required").min(3).max(50, "Name is too long"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  contact: yup
    .string()
    .matches(/^[0-9]{10}$/, "Contact must be a 10-digit number")
    .required("Required"),
  department: yup
    .string()
    .oneOf(DEPARTMENTS, "Invalid department")
    .required("Required"),
});