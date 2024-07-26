import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { saveSolicitud } from "../../../services/solicitude"; // Asegúrate de que esta ruta sea correcta
import { useEffect, useState } from "react";
import EmployeeDropdown from "./EmployeeDropdown";

const validationSchema = Yup.object({
  codigo: Yup.string()
    .max(50, "El código debe tener hasta 50 caracteres")
    .required("El código es requerido"),
  descripcion: Yup.string()
    .max(50, "La descripción debe tener hasta 50 caracteres")
    .required("La descripción es requerida"),
  resumen: Yup.string()
    .max(50, "El resumen debe tener hasta 50 caracteres")
    .required("El resumen es requerido"),
  id_empleado: Yup.number()
    .required("El ID del empleado es requerido")
    .positive("El ID del empleado debe ser un número positivo")
    .integer("El ID del empleado debe ser un número entero"),
});

const SolicitudFormDialog = ({
  visible,
  hideDialog,
  selectedData,
  getSolicitude,
}) => {
  const [initialValues, setInitialValues] = useState({
    id: null,
    codigo: "",
    descripcion: "",
    resumen: "",
    id_empleado: "",
  });

  useEffect(() => {
    if (selectedData) {
      setInitialValues({
        id: selectedData.id ?? null,
        codigo: selectedData.codigo ?? "",
        descripcion: selectedData.descripcion ?? "",
        resumen: selectedData.resumen ?? "",
        id_empleado: selectedData.id_empleado ?? "",
      });
    } else {
      setInitialValues({
        id: null,
        codigo: "",
        descripcion: "",
        resumen: "",
        id_empleado: "",
      });
    }
  }, [selectedData, visible]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await saveSolicitud(values);

      if (result.message) {
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        formik.resetForm();
        getSolicitude();
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
      header="Formulario de Solicitud"
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
          <label htmlFor="codigo">Código</label>
          <InputText
            id="codigo"
            type="text"
            value={formik.values.codigo}
            onChange={formik.handleChange}
            className={
              formik.errors.codigo && formik.touched.codigo ? "p-invalid" : ""
            }
          />
          <small id="codigo-help">
            {formik.errors.codigo && formik.touched.codigo
              ? formik.errors.codigo
              : ""}
          </small>
        </div>

        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputText
            id="descripcion"
            type="text"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            className={
              formik.errors.descripcion && formik.touched.descripcion
                ? "p-invalid"
                : ""
            }
          />
          <small id="descripcion-help">
            {formik.errors.descripcion && formik.touched.descripcion
              ? formik.errors.descripcion
              : ""}
          </small>
        </div>

        <div className="field">
          <label htmlFor="resumen">Resumen</label>
          <InputText
            id="resumen"
            type="text"
            value={formik.values.resumen}
            onChange={formik.handleChange}
            className={
              formik.errors.resumen && formik.touched.resumen ? "p-invalid" : ""
            }
          />
          <small id="resumen-help">
            {formik.errors.resumen && formik.touched.resumen
              ? formik.errors.resumen
              : ""}
          </small>
        </div>

        <div className="field">
          <EmployeeDropdown formik={formik} />
        </div>
      </div>
    </Dialog>
  );
};

SolicitudFormDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  hideDialog: PropTypes.func.isRequired,
  getSolicitude: PropTypes.func.isRequired,
  selectedData: PropTypes.shape({
    id: PropTypes.number,
    codigo: PropTypes.string,
    descripcion: PropTypes.string,
    resumen: PropTypes.string,
    id_empleado: PropTypes.number,
  }),
};

export default SolicitudFormDialog;
