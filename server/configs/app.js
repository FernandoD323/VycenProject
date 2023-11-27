'use strict'

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRoutes = require('../src/routes/user.routes');
const companyRoutes = require('../src/routes/company.routes');
const productRoutes = require('../src/routes/product.routes');
const cartRoutes = require('../src/routes/shoppingCart.routes');
const forumRoutes = require('../src/routes/forum.routes');
const galleryRoutes = require('../src/routes/gallery.routes');
const reportRoutes = require('../src/routes/reports.routes');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/forum', forumRoutes);
app.use('/gallery', galleryRoutes);
app.use('/reports', reportRoutes);

app.use(fileUpload());

// Ruta para subir archivos
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const sampleFile = req.files.sampleFile;

  // Lista de extensiones permitidas (puedes ajustarla según tus necesidades)
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

  const fileExtension = path.extname(sampleFile.name).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return res.status(400).json({
      message: 'Invalid file extension. Allowed extensions: ' + allowedExtensions.join(', ')
    });
  }

  // Generar un nombre único para el archivo basado en la fecha actual
  const uniqueFileName = `archivo_${Date.now()}${fileExtension}`;
  const uploadPath = path.join(__dirname, '..','uploads', uniqueFileName);

  // Mover el archivo al directorio de destino
  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.json({ message: 'File uploaded!', fileName: uniqueFileName });
  });
});


module.exports = app;