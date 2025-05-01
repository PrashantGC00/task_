import React, { useState, useEffect } from 'react';
import Table from '../../../utils/Components/Tables/Table';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DEPARTMENTS } from '../../../utils/Others/Departments';

const EmployeeTable = ({ employees }) => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees || []);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  
  useEffect(() => {
    if (selectedDepartment === 'All') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        e => e.department === selectedDepartment
      );
      setFilteredEmployees(filtered);
    }
  }, [selectedDepartment, employees]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center pt-4 overflow-auto">
      <div className="w-full px-4 mt-3">
        <div className='w-full flex justify-center items-center'>
        <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel>Filter</InputLabel>
            <Select
              value={selectedDepartment}
              label="Filter"
              onChange={handleDepartmentChange}
            >
              <MenuItem value="All">
                All
              </MenuItem>
              {DEPARTMENTS.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="w-full overflow-x-auto">
          <Table employees={filteredEmployees} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
