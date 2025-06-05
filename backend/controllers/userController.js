const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registrarUsuario = async (req, res) => {
  const { nombre, telefono, edad, descripcion, foto, email, password } = req.body;

  const usuarioExiste = await User.findOne({ email });
  if (usuarioExiste) return res.status(400).json({ mensaje: 'Usuario ya registrado' });

  const hash = await bcrypt.hash(password, 10);

  const nuevoUsuario = await User.create({
    nombre, telefono, edad, descripcion, foto, email, password: hash
  });

  res.status(201).json({
    _id: nuevoUsuario._id,
    nombre: nuevoUsuario.nombre,
    token: generarToken(nuevoUsuario._id)
  });
};

exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await User.findOne({ email });
  if (!usuario) return res.status(400).json({ mensaje: 'Credenciales inválidas' });

  const esCorrecta = await bcrypt.compare(password, usuario.password);
  if (!esCorrecta) return res.status(400).json({ mensaje: 'Credenciales inválidas' });

  res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    token: generarToken(usuario._id)
  });
};
