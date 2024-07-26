# Proyecto Backend

Descripción

Este proyecto es un backend en Node.js utilizando PostgreSQL como base de datos. Incluye tablas para manejar usuarios, empleados y solicitudes. El proyecto está configurado para ejecutarse con Node.js y utiliza varias dependencias para manejo de autenticación, seguridad y conexión con PostgreSQL.

## Instalación

1. **Clona el repositorio:**
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>

2. **Instala las dependencias:**

npm install

3. **Configura el archivo .env:**

Crea un archivo .env en la raíz del proyecto y agrega las variables necesarias para conectar con tu base de datos PostgreSQL y configurar el entorno. A continuación se muestra un ejemplo de archivo .env:

DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DATABASE=tu_base_de_datos
DB_PORT=5432
SALT_ROUNDS=10
PORT=3000
SECRET_JWT_KEY=tu_clave_secreta

4. **Ejecuta el proyecto en modo desarrollo:**

npm run dev

### Configuración de la Base de Datos

Antes de comenzar a usar la aplicación, debes configurar la base de datos PostgreSQL creando las tablas necesarias. Sigue estos pasos para ejecutar las consultas SQL que crean las tablas:

Accede a tu base de datos PostgreSQL:

Puedes hacerlo usando una herramienta de administración de bases de datos como pgAdmin, DBeaver, o desde la línea de comandos con psql. Asegúrate de estar conectado a la base de datos especificada en el archivo .env (DB_DATABASE).

Ejecuta las consultas SQL para crear las tablas:

Copia y pega cada una de las siguientes consultas en tu herramienta de administración de bases de datos o en la línea de comandos para crear las tablas necesarias.Tabla users

**Tabla users**

CREATE TABLE users (
id SERIAL PRIMARY KEY,
nombre VARCHAR(40),
email TEXT NOT NULL UNIQUE,
roles TEXT[] DEFAULT '{}',
created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

Esta tabla almacena información sobre los usuarios del sistema, incluyendo su nombre, correo electrónico, roles y la fecha de creación.

**Tabla Empleado**

CREATE TABLE Empleado (
ID SERIAL PRIMARY KEY,
FECHA_INGRESO DATE,
NOMBRE VARCHAR(50),
SALARIO NUMERIC
);

Esta tabla almacena información sobre los empleados, incluyendo la fecha de ingreso, nombre y salario.

**Tabla Solicitud**

CREATE TABLE Solicitud (
ID SERIAL PRIMARY KEY,
CODIGO VARCHAR(50),
DESCRIPCION VARCHAR(50),
RESUMEN VARCHAR(50),
ID_EMPLEADO INT,
CONSTRAINT fk_empleado FOREIGN KEY (ID_EMPLEADO) REFERENCES Empleado(ID)
);

#### Consultas SQL

**Insertar un empleado**

INSERT INTO Empleado (FECHA_INGRESO, NOMBRE, SALARIO)
VALUES ('YYYY-MM-DD', 'Nombre del Empleado', 50000.00);

**Insertar una solicitud**

INSERT INTO Solicitud (CODIGO, DESCRIPCION, RESUMEN, ID_EMPLEADO)
VALUES ('CODIGO123', 'Descripción de la Solicitud', 'Resumen de la Solicitud', 1);

**Actualizar roles de un usuario**

UPDATE users
SET roles = ARRAY['nuevo_rol'] administrador o empleado
WHERE email = 'email_del_usuario@example.com';
