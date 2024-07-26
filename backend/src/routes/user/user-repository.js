import { pool } from "../../db.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../config.js";

// Esquema base
const baseSchema = z.object({
  email: z.string().email({ message: "El email no es válido" }),
  password: z.string().min(6, {
    message: "La contraseña debe contener 6 caracteres como mínimo",
  }),
});

// Esquema para la creación de un usuario
const usersSchema = baseSchema.extend({
  name: z.string().min(3, {
    message: "El nombre debe contener 3 caracteres como mínimo",
  }),
});

export class UsersRepository {
  static async create({ email, password, name }) {
    try {
      usersSchema.parse({ email, password, name });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0]?.message || "Error de validación");
      }
      throw error;
    }

    // VERIFICAR SI EXISTE EL USUARIO
    const { rows: existingUserRows } = await pool.query(
      "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS exists",
      [email]
    );

    if (existingUserRows[0].exists) throw new Error("El email ya existe");

    // Insertar el nuevo usuario en la base de datos
    const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    await pool.query(
      "INSERT INTO users (nombre, email, password, roles, created_at) VALUES ($1, $2, $3, $4, NOW())",
      [name, email, hashedPassword, ["empleado"]]
    );

    const { rows: userRows } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!userRows.length) throw new Error("Usuario no encontrado");

    const user = userRows[0];

    return {
      id: user.id,
      email: user.email,
      name: user.nombre,
      created_at: user.created_at,
      roles: user.roles,
    };
  }

  static login = async ({ email, password }) => {
    try {
      baseSchema.parse({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0]?.message || "Error de validación");
      }
      throw error;
    }

    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!rows.length) throw new Error("Usuario no encontrado");

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Contraseña incorrecta");

    return {
      id: user.id,
      email: user.email,
      name: user.nombre,
      created_at: user.created_at,
      roles: user.roles,
    };
  };
}
