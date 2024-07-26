import { isAdmin, isAuthenticated } from "../../middlewares/authMiddleware.js";
import { EmpleadoRepository } from "./empleado-repository.js"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { Router } from "express";
const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const empleados = await EmpleadoRepository.findAll();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/crear", isAuthenticated, async (req, res) => {
  const { nombre, salario, fechaIngreso } = req.body;
  try {
    const empleado = await EmpleadoRepository.create({
      nombre,
      salario,
      fechaIngreso,
    });
    res.status(201).json(empleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un empleado por ID
router.get("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const empleado = await EmpleadoRepository.findById(id);
    res.status(200).json(empleado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Ruta para actualizar un empleado por ID
router.put("/update", isAdmin, async (req, res) => {
  const { nombre, salario, fechaIngreso, id } = req.body;
  try {
    const updatedEmpleado = await EmpleadoRepository.update(id, {
      nombre,
      salario,
      fechaIngreso,
    });
    res.status(200).json(updatedEmpleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un empleado por ID
router.delete("/delete/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await EmpleadoRepository.delete(id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
