
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Employee from "./pages/Employee/Employee";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
