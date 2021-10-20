const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const validateJWT = require('./auth/validateJWT');
const User = require('../controllers/users');
const Recipe = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, 'src/uploads');
    },
    filename: (req, _file, callback) => {
        callback(null, `${req.params.id}.jpeg`);
    },
});

const upload = multer({ storage });

app.post('/users', User.create);
app.post('/users/admin', validateJWT, User.createAdmin);
app.post('/login', User.login);
app.post('/recipes', validateJWT, Recipe.create);
app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.getById);
app.put('/recipes/:id', validateJWT, Recipe.updateRecipe);
app.delete('/recipes/:id', validateJWT, Recipe.deleteRecipe);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), Recipe.addImage);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
