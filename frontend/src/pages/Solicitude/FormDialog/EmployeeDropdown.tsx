import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { fetchAllEmployees } from "../../../lib/data";
import { toast } from "react-toastify";

const EmployeeDropdown = ({ formik }) => {
  const [data, setData] = useState([]);

  const getEmployees = async () => {
    try {
      const employees = await fetchAllEmployees();
      const formattedEmployees = employees.map((employee) => ({
        label: employee.nombre,
        value: employee.id,
      }));
      setData(formattedEmployees);
    } catch (error) {
      toast.error(`Error fetching employees: ${error.message}`);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="field">
      <label htmlFor="name">Empleado</label>
      <Dropdown
        id="id_empleado"
        name="id_empleado"
        value={formik.values.id_empleado}
        onChange={(e) => formik.setFieldValue("id_empleado", e.value)}
        options={data}
        placeholder="Selecciona el empleado"
        filter
        disabled={data.length === 0}
      />
      <small id="dni-help">
        {formik.errors.id_empleado && formik.touched.id_empleado
          ? formik.errors.id_empleado
          : ""}
      </small>
    </div>
  );
};

export default EmployeeDropdown;
