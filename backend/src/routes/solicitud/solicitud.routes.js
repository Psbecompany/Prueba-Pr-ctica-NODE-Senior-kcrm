import { isAdmin } from "../../middlewares/authMiddleware.js";
import { SolicitudRepository } from "./solicitud-repository.js"; // Ajusta la ruta según tu estructura de archivos
import { Router } from "express";
const router = Router();

router.get("/", isAdmin, async (req, res) => {
  try {
    const solicitudes = await SolicitudRepository.findAll();
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/crear", isAdmin, async (req, res) => {
  const { codigo, descripcion, resumen, id_empleado } = req.body;
  try {
    const solicitud = await SolicitudRepository.create({
      codigo,
      descripcion,
      resumen,
      id_empleado,
    });
    res.status(201).json(solicitud);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const solicitud = await SolicitudRepository.findById(id);
    res.status(200).json(solicitud);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/update", isAdmin, async (req, res) => {
  const { codigo, descripcion, resumen, id_empleado, id } = req.body;
  try {
    const updatedSolicitud = await SolicitudRepository.update(id, {
      codigo,
      descripcion,
      resumen,
      id_empleado,
    });
    res.status(200).json(updatedSolicitud);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await SolicitudRepository.delete(id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
