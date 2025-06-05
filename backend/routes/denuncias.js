const express = require('express');
const router = express.Router();
const Denuncia = require('../models/denuncia');
const upload = require('../middlewares/upload');

// Crear denuncia con imagen
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    let ubicacion = req.body.ubicacion;
    if (typeof ubicacion === 'string') {
      try {
        ubicacion = JSON.parse(ubicacion);
      } catch {
        ubicacion = null;
      }
    }
    const nuevaDenuncia = new Denuncia({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      ubicacion,
      usuario: req.body.usuario || null,
      anonimo: req.body.anonimo === 'true' || req.body.anonimo === true,
      comentarios: [],
      imagen: req.file ? req.file.filename : null,
      fecha: new Date()
    });
    const denunciaGuardada = await nuevaDenuncia.save();
    res.status(201).json(denunciaGuardada);
  } catch (err) {
    console.error('❌ Error al guardar denuncia:', err);
    res.status(500).json({ error: 'Error al guardar denuncia' });
  }
});

// Obtener todas las denuncias
router.get('/', require('../controllers/denunciaController').obtenerDenuncias);
// Obtener denuncia por ID
router.get('/:id', require('../controllers/denunciaController').obtenerDenunciaPorId);
// Actualizar denuncia
router.put('/:id', require('../controllers/denunciaController').actualizarDenuncia);
// Eliminar denuncia
router.delete('/:id', require('../controllers/denunciaController').eliminarDenuncia);
// Endpoint para agregar comentario a una denuncia
router.post('/:id/comentarios', async (req, res) => {
  try {
    console.log('Comentario recibido:', req.body, 'ID:', req.params.id);
    const { texto, usuario } = req.body;
    const denuncia = await Denuncia.findById(req.params.id);
    if (!denuncia) return res.status(404).json({ error: "Denuncia no encontrada" });
    denuncia.comentarios.push({ usuario, texto });
    await denuncia.save();
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Error al agregar comentario:', err);
    res.status(500).json({ error: "Error al agregar comentario" });
  }
});

module.exports = router;
