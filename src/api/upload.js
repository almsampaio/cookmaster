// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const app = require('./app');

// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// const storage = multer.diskStorage({
//   destination: (_req, _file, callback) => {
//     callback(null, 'uploads');
//   },

//   filename: (req, file, callback) => {
//     callback(null, `${req.params.id}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// module.exports = {
//   upload,
// };
