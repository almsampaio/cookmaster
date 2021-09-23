const express = require('express');
const multer = require('multer');
const path = require('path');

const route = express.Router();
route.use(express.static(path.join(__dirname, '..', '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });

module.exports = {
  upload,
  route,
};
