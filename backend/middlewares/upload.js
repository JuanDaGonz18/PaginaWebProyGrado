const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Crear carpeta si no existe
const carpetaImagenes = path.join("uploads");
if (!fs.existsSync(carpetaImagenes)) fs.mkdirSync(carpetaImagenes);

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + "-" + file.originalname;
    cb(null, nombreUnico);
  },
});

const upload = multer({ storage });

module.exports = upload;
