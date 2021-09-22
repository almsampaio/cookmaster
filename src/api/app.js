const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const Users = require('../controllers/usersController');
const Recipes = require('../controllers/recipesController');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '/uploads')));

const upload = multer({ dest: 'uploads' });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Endpoint para Usuários

app.post('/users', Users.create);
app.post('/login', Users.login);

// Endpoint para Receitas

app.post('/recipes', validateJWT, Recipes.create);
app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.findById);
app.put('/recipes/:id', validateJWT, Recipes.update);
app.delete('/recipes/:id', validateJWT, Recipes.deleteInfo);
app.post('/recipes/:id/image/', validateJWT, upload.single('file'), Recipes.insertImage);

module.exports = app;
