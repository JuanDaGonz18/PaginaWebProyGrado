const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const rutasDenuncias = require('./routes/Denuncias');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static('uploads'));

// Este es el que lanza error si 'rutasDenuncias' no es una función middleware
app.use('/api/denuncias', rutasDenuncias);

// Conexión y arranque del servidor
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://admin:CONTRASEÑA@juandagon.sed6ucw.mongodb.net/?retryWrites=true&w=majority&appName=JuandaGon')
  .then(() => {
    console.log('MongoDB conectado ✔️');
    app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
  })
  .catch((err) => console.error(err));
