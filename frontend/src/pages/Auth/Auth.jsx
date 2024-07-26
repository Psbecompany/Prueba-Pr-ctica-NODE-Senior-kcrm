import { useState } from "react";
import styles from "./index.module.css";

//ASSETS
import registerImg from "../../assets/img/register.svg";
import loginImg from "../../assets/img/login.svg";
//ASSETS

// COMPONENTES

import Login from "./components/Login";

// COMPONENTES

//PRIME REACT
import { Button } from "primereact/button";
import Register from "./components/Register";
//PRIME REACT

function Auth() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  return (
    <div>
      <div
        className={`${styles.container} ${
          isSignUpMode ? styles["sign-up-mode"] : ""
        }`}
      >
        <div className={styles["forms-container"]}>
          <div className={styles["signin-signup"]}>
            <Login />
            <Register />
          </div>
        </div>

        <div className={styles["panels-container"]}>
          <div className={`${styles.panel} ${styles["left-panel"]}`}>
            <div className={styles.content}>
              <h3 className="text-2xl md:text-3xl lg:text-5xl">¿Eres nuevo?</h3>
              <p className="text-lg md:text-xl lg:text-2xl">
                ¡Bienvenido al panel de administración! Regístrate para empezar
                a gestionar tu plataforma.
              </p>
              <Button
                label="Regístrate"
                outlined
                onClick={() => setIsSignUpMode(true)}
                className="text-white"
              />
            </div>
            <img src={loginImg} className={styles.image} alt="" />
          </div>
          <div className={`${styles.panel} ${styles["right-panel"]}`}>
            <div className={styles.content}>
              <h3 className="text-2xl md:text-3xl lg:text-5xl">
                ¿Ya estás registrado?
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl">
                Ingresa con tu cuenta de administrador para acceder a todas las
                funciones de gestión y control.
              </p>
              <Button
                label="Iniciar sesión"
                outlined
                onClick={() => setIsSignUpMode(false)}
                className="text-white"
              />
            </div>
            <img src={registerImg} className={styles.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
