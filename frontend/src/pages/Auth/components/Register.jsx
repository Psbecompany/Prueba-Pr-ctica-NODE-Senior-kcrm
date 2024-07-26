import styles from "../index.module.css";
import { toast } from "react-toastify";

// COMPONENTES
import PasswordTemplate from "./PasswordTemplate";
// COMPONENTES
//PRIME REACT
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
//PRIME REACT
// ICONOS
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
// ICONOS
// FORMIK
import * as Yup from "yup";
import { useFormik } from "formik";
// FORMIK

import useAuth from "../../../hooks/useAuth";

function Register() {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      dni: null,
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede tener más de 50 caracteres")
        .matches(
          /^[A-Za-z\s]+$/,
          "El nombre solo puede contener letras y espacios"
        )
        .required("El nombre es obligatorio"),
      email: Yup.string()
        .email("El correo electrónico es invalido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("No se proporcionó contraseña.")
        .min(
          8,
          "La contraseña es demasiado corta; debe tener un mínimo de 8 caracteres"
        ),
    }),
    onSubmit: async (values) => {
      values.email = values.email.trim().toLowerCase();
      const result = await register(values);
      // Manejar la respuesta del login aquí
      console.log("Resultado del login:", result);
      if (result.message) {
        // Muestra el mensaje de error si existe
        toast.error(result.message);
      }
    },
  });

  return (
    <div className={`${styles.form} ${styles["sign-up-form"]}`}>
      <h2 className="text-2xl md:text-3xl lg:text-5xl">Registrarse</h2>

      <div className="md:w-full lg:w-full xl:w-8 mt-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <PiPersonArmsSpreadFill size="20" />
          </span>
          <InputText
            placeholder="Nombre"
            className="p-inputtext-lg"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            invalid={
              !(
                formik.errors.name === undefined ||
                formik.touched.name === undefined
              )
            }
            aria-describedby="name-help"
          />
        </div>
        <small id="name-help">
          {formik.errors.name && formik.touched.name ? formik.errors.name : ""}
        </small>
      </div>
      <div className="md:w-full lg:w-full xl:w-8 mt-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <MdEmail size="20" />
          </span>
          <InputText
            placeholder="Correo electrónico"
            className="p-inputtext-lg"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            invalid={
              !(
                formik.errors.email === undefined ||
                formik.touched.email === undefined
              )
            }
            aria-describedby="email-help"
          />
        </div>
        <small id="email-help">
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : ""}
        </small>
      </div>
      <div className="md:w-full lg:w-full xl:w-8 mt-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <FaLock size="18" />
          </span>
          <PasswordTemplate
            name="password"
            handleChange={formik.handleChange}
            value={formik.values.password}
            invalid={
              !(
                formik.errors.password === undefined ||
                formik.touched.password === undefined
              )
            }
          />
        </div>
        <small id="password-help">
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : ""}
        </small>
      </div>

      <Button
        label="Registrarse"
        className="mt-4 p-3 text-xl md:w-full lg:w-full xl:w-8"
        onClick={() => formik.handleSubmit()}
      ></Button>
    </div>
  );
}

export default Register;
