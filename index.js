const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Carpeta donde se guardarán los archivos
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // Guarda el archivo con su nombre original
    cb(null, file.originalname);
  }
});

// Configura multer con la opción de almacenamiento
const upload = multer({ storage: storage });

// Configuración para servir archivos estáticos (para el frontend HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Archivo subido exitosamente');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
