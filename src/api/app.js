const express = require('express');
const bodyparser = require('body-parser');
const multer = require('multer');

const UserController = require('../controllers/userController');
const RecipeController = require('../controllers/recipeController');
const Login = require('../controllers/login');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyparser.json());

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  } });

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UserController.create);
app.post('/login', Login);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), RecipeController.addImage);
app.delete('/recipes/:id', validateJWT, RecipeController.remove);
app.get('/recipes/:id', RecipeController.find);
app.put('/recipes/:id', validateJWT, RecipeController.edit);
app.post('/recipes', validateJWT, RecipeController.create);
app.get('/recipes', RecipeController.getAll);

module.exports = app;
