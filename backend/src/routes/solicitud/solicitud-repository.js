import { pool } from "../../db.js"; // Asegúrate de tener una conexión a la base de datos configurada
import { z } from "zod";

// Esquema base
const baseSchema = z.object({
  codigo: z.string().min(1, {
    message: "El código es requerido",
  }),
  descripcion: z.string().min(1, {
    message: "La descripción es requerida",
  }),
  resumen: z.string().min(1, {
    message: "El resumen es requerido",
  }),
  id_empleado: z.number().positive({
    message: "El ID del empleado debe ser un número positivo",
  }),
});

// Esquema para la creación de una solicitud
const solicitudSchema = baseSchema;

export class SolicitudRepository {
  static async create({ codigo, descripcion, resumen, id_empleado }) {
    try {
      solicitudSchema.parse({ codigo, descripcion, resumen, id_empleado });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0]?.message || "Error de validación");
      }
      throw error;
    }

    // Insertar la nueva solicitud en la base de datos
    await pool.query(
      "INSERT INTO Solicitud (CODIGO, DESCRIPCION, RESUMEN, ID_EMPLEADO) VALUES ($1, $2, $3, $4)",
      [codigo, descripcion, resumen, id_empleado]
    );

    return { codigo, descripcion, resumen, id_empleado };
  }

  static async findAll() {
    const { rows } = await pool.query(
      `SELECT s.ID, s.CODIGO, s.DESCRIPCION, s.RESUMEN, s.ID_EMPLEADO, e.NOMBRE AS NOMBRE_EMPLEADO
       FROM Solicitud s
       JOIN Empleado e ON s.ID_EMPLEADO = e.ID
       ORDER BY s.ID DESC`
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT s.ID, s.CODIGO, s.DESCRIPCION, s.RESUMEN, s.ID_EMPLEADO, e.NOMBRE AS NOMBRE_EMPLEADO
       FROM Solicitud s
       JOIN Empleado e ON s.ID_EMPLEADO = e.ID
       WHERE s.ID = $1`,
      [id]
    );

    if (!rows.length) throw new Error("Solicitud no encontrada");

    return rows[0];
  }

  static async update(id, { codigo, descripcion, resumen, id_empleado }) {
    try {
      solicitudSchema.parse({ codigo, descripcion, resumen, id_empleado });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0]?.message || "Error de validación");
      }
      throw error;
    }

    // Actualizar la solicitud en la base de datos
    const result = await pool.query(
      "UPDATE Solicitud SET CODIGO = $1, DESCRIPCION = $2, RESUMEN = $3, ID_EMPLEADO = $4 WHERE ID = $5",
      [codigo, descripcion, resumen, id_empleado, id]
    );

    if (result.rowCount === 0) throw new Error("Solicitud no encontrada");

    return { id, codigo, descripcion, resumen, id_empleado };
  }

  static async delete(id) {
    const result = await pool.query("DELETE FROM Solicitud WHERE ID = $1", [
      parseInt(id),
    ]);

    if (result.rowCount === 0) throw new Error("Solicitud no encontrada");

    return { id };
  }
}
