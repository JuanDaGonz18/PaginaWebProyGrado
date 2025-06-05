// models/Denuncia.js
const mongoose = require('mongoose');

const denunciaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  ubicacion: {
    lat: Number,
    lng: Number
  },
  usuario: { type: String, default: null },
  anonimo: { type: Boolean, default: false },
  comentarios: [{ usuario: String, texto: String }],
  imagen: { type: String }, // <-- Este campo es clave
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Denuncia', denunciaSchema);
