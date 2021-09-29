const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipesController');
const validateWebToken = require('./auth/validateToken');

const app = express();
app.use(bodyParser.json());

// https://nodejs.dev/learn/the-nodejs-path-module
app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// fazendo multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`); 
  },
  
});

const upload = multer({ storage });

app.get('/recipes', recipeController.getAll);
app.get('/recipes/:id', recipeController.getById);

app.post('/users', usersController.create);
app.post('/login', loginController.logIn);
app.post('/recipes', validateWebToken, recipeController.create);

app.put('/recipes/:id', validateWebToken, recipeController.update);
app.put('/recipes/:id/image', validateWebToken, 
          upload.single('image'), recipeController.imageAdded);

app.delete('/recipes/:id', validateWebToken, recipeController.exclude);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
