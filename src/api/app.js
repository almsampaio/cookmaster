const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const { validateJWT } = require('./auth/validateJWT');
const { addImage } = require('./controllers/recipesController');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

const usersRoute = require('./routes/usersRoute');

app.use('/', usersRoute);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });
app.put('/recipes/:id/image/', validateJWT, upload.single('image'), addImage);

module.exports = app;
