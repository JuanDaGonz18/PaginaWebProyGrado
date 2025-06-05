// controllers/denunciaController.js
const Denuncia = require('../models/denuncia');

exports.crearDenuncia = async (req, res) => {
  try {
    const denuncia = new Denuncia(req.body);
    await denuncia.save();
    res.status(201).json(denuncia);
  } catch (error) {
    console.error('❌ Error al guardar la denuncia:', error.message);
    res.status(500).json({ error: 'Error al guardar la denuncia' });
  }
};

exports.obtenerDenuncias = async (req, res) => {
  try {
    const denuncias = await Denuncia.find();
    res.json(denuncias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener denuncias' });
  }
};

// Agrega esta función al controlador
exports.obtenerDenunciaPorId = async (req, res) => {
  try {
    const denuncia = await Denuncia.findById(req.params.id);
    if (!denuncia) {
      return res.status(404).json({ error: 'Denuncia no encontrada' });
    }
    res.json(denuncia);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la denuncia' });
  }
};

exports.actualizarDenuncia = async (req, res) => {
  try {
    const denunciaActualizada = await Denuncia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // para que devuelva la denuncia actualizada
    );
    if (!denunciaActualizada) {
      return res.status(404).json({ error: 'Denuncia no encontrada' });
    }
    res.json(denunciaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la denuncia' });
  }
};

exports.eliminarDenuncia = async (req, res) => {
  try {
    const denunciaEliminada = await Denuncia.findByIdAndDelete(req.params.id);
    if (!denunciaEliminada) {
      return res.status(404).json({ error: 'Denuncia no encontrada' });
    }
    res.json({ message: 'Denuncia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la denuncia' });
  }
};

// Agregar comentario a una denuncia
exports.agregarComentario = async (req, res) => {
  try {
    const { texto, usuario } = req.body;
    if (!texto || !usuario) {
      return res.status(400).json({ error: 'Faltan datos del comentario' });
    }
    const denuncia = await Denuncia.findById(req.params.id);
    if (!denuncia) {
      return res.status(404).json({ error: 'Denuncia no encontrada' });
    }
    denuncia.comentarios.push({ texto, usuario });
    await denuncia.save();
    res.status(201).json(denuncia.comentarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar comentario' });
  }
};