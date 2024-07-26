import { pool } from "../../db.js"; // Asegúrate de tener una conexión a la base de datos configurada
import { z } from "zod";

// Esquema base
const baseSchema = z.object({
  nombre: z.string().min(3, {
    message: "El nombre debe contener 3 caracteres como mínimo",
  }),
  salario: z.number().positive({
    message: "El salario debe ser un número positivo",
  }),
});

// Esquema para la creación de un empleado
const empleadoSchema = baseSchema.extend({
  fechaIngreso: z.string().optional(), // Puedes usar Date si deseas manejar las fechas en formato de objeto Date
});

export class EmpleadoRepository {
  static async create({ nombre, salario, fechaIngreso }) {
    try {
      empleadoSchema.parse({ nombre, salario, fechaIngreso });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0]?.message || "Error de validación");
      }
      throw error;
    }

    // Insertar el nuevo empleado en la base de datos
    await pool.query(
      "INSERT INTO empleado (NOMBRE, SALARIO, FECHA_INGRESO) VALUES ($1, $2, $3)",
      [nombre, salario, fechaIngreso || null]
    );

    return { nombre, salario, fechaIngreso };
  }

  static async findAll() {
    const { rows } = await pool.query(
      "SELECT ID, FECHA_INGRESO, NOMBRE, CAST(SALARIO AS FLOAT) AS SALARIO FROM Empleado ORDER BY ID DESC"
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query("SELECT * FROM empleado WHERE ID = $1", [
      id,
    ]);

    if (!rows.length) throw new Error("empleado no encontrado");

    return rows[0];
  }

  static async update(id, { nombre, salario, fechaIngreso }) {
    try {
      empleadoSchema.parse({ nombre, salario, fechaIngreso });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0]?.message || "Error de validación");
      }
      throw error;
    }

    // Actualizar el empleado en la base de datos
    const result = await pool.query(
      "UPDATE empleado SET NOMBRE = $1, SALARIO = $2, FECHA_INGRESO = $3 WHERE ID = $4",
      [nombre, salario, fechaIngreso || null, id]
    );

    if (result.rowCount === 0) throw new Error("empleado no encontrado");

    return { id, nombre, salario, fechaIngreso };
  }

  static async delete(id) {
    const result = await pool.query("DELETE FROM empleado WHERE ID = $1", [
      parseInt(id),
    ]);

    if (result.rowCount === 0) throw new Error("empleado no encontrado");

    return { id };
  }
}
