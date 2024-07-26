import PropTypes from "prop-types";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";

const PasswordTemplate = ({ handleChange, name, value, invalid }) => {
  const header = <div className="font-bold mb-3">Escribe una contraseña</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Sugerencias</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>Al menos una minúscula</li>
        <li>Al menos una mayúscula</li>
        <li>Al menos un número</li>
        <li>Mínimo 8 caracteres</li>
      </ul>
    </>
  );

  return (
    <Password
      name={name}
      onChange={handleChange}
      header={header}
      footer={footer}
      className="p-inputtext-lg"
      placeholder="Contraseña"
      promptLabel="Por favor ingrese una contraseña"
      value={value}
      aria-describedby="password-help"
      invalid={invalid}
    />
  );
};

PasswordTemplate.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default PasswordTemplate;
