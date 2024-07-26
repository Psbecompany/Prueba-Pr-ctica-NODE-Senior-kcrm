CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    email TEXT NOT NULL UNIQUE,
    roles TEXT[] DEFAULT '{}',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)

    -- Crear la tabla Empleado
CREATE TABLE Empleado (
    ID SERIAL PRIMARY KEY,
    FECHA_INGRESO DATE,
    NOMBRE VARCHAR(50),
    SALARIO NUMERIC
);

-- Crear la tabla Solicitud
CREATE TABLE Solicitud (
    ID SERIAL PRIMARY KEY,
    CODIGO VARCHAR(50),
    DESCRIPCION VARCHAR(50),
    RESUMEN VARCHAR(50),
    ID_EMPLEADO INT,
    CONSTRAINT fk_empleado
        FOREIGN KEY (ID_EMPLEADO) 
        REFERENCES Empleado(ID)
);
