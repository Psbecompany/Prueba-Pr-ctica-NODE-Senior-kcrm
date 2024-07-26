import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Calendar } from "primereact/calendar";
import { toast } from "react-toastify";
import { saveEmpleado } from "../../../services/employee";
import { useEffect, useState } from "react";

const validationSchema = Yup.object({
  fechaIngreso: Yup.date().required("La fecha de ingreso es requerida"),
  nombre: Yup.string()
    .max(50, "El nombre debe tener hasta 50 caracteres")
    .required("El nombre es requerido"),
  salario: Yup.number()
    .min(0, "El salario debe ser un número positivo")
    .required("El salario es requerido"),
});

const EmpleadoFormDialog = ({
  visible,
  hideDialog,
  selectedData,
  getEmployees,
}) => {
  const [initialValues, setInitialValues] = useState({
    id: null,
    fechaIngreso: new Date(),
    nombre: "",
    salario: "",
  });

  useEffect(() => {
    if (selectedData) {
      setInitialValues({
        id: selectedData.id ?? null,
        fechaIngreso: selectedData.fechaIngreso ?? new Date(),
        nombre: selectedData.nombre ?? "",
        salario: selectedData.salario ?? "",
      });
    } else {
      setInitialValues({
        id: null,
        fechaIngreso: new Date(),
        nombre: "",
        salario: "",
      });
    }
  }, [selectedData, visible]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await saveEmpleado(values);

      if (result.message) {
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        formik.resetForm();
        getEmployees();
        hideDialog();
      }
    },
  });

  useEffect(() => {
    if (!visible) {
      formik.resetForm();
    }
  }, [visible]);

  return (
    <Dialog
      visible={visible}
      style={{ width: "50vw" }}
      header="Formulario de Empleado"
      modal
      footer={
        <div>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => {
              hideDialog();
              formik.resetForm();
            }}
          />
          <Button
            label="Guardar"
            icon="pi pi-check"
            onClick={() => formik.handleSubmit()}
            severity="success"
          />
        </div>
      }
      onHide={() => {
        hideDialog();
        formik.resetForm();
      }}
    >
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
          <Calendar
            value={formik.values.fechaIngreso}
            onChange={(e) => formik.setFieldValue("fechaIngreso", e.value)}
            className={
              formik.errors.fechaIngreso && formik.touched.fechaIngreso
                ? "p-invalid"
                : ""
            }
          />
          <small id="fechaIngreso-help">
            {formik.errors.fechaIngreso && formik.touched.fechaIngreso
              ? formik.errors.fechaIngreso
              : ""}
          </small>
        </div>

        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            type="text"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            className={
              formik.errors.nombre && formik.touched.nombre ? "p-invalid" : ""
            }
          />
          <small id="nombre-help">
            {formik.errors.nombre && formik.touched.nombre
              ? formik.errors.nombre
              : ""}
          </small>
        </div>

        <div className="field">
          <label htmlFor="salario">Salario</label>
          <InputNumber
            id="salario"
            value={formik.values.salario}
            onValueChange={(e) => formik.setFieldValue("salario", e.value)}
            mode="currency"
            currency="USD"
            locale="en-US"
            className={
              formik.errors.salario && formik.touched.salario ? "p-invalid" : ""
            }
          />
          <small id="salario-help">
            {formik.errors.salario && formik.touched.salario
              ? formik.errors.salario
              : ""}
          </small>
        </div>
      </div>
    </Dialog>
  );
};

EmpleadoFormDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  hideDialog: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  selectedData: PropTypes.shape({
    id: PropTypes.number,
    fechaIngreso: PropTypes.instanceOf(Date),
    nombre: PropTypes.string,
    salario: PropTypes.number,
  }),
};

export default EmpleadoFormDialog;
