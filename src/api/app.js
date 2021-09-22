const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const { authBasic } = require('../auth/basicAuth');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'src/uploads'); },
  filename: (req, file, callback) => { callback(null, `${req.params.id}.jpeg`); },
});

const upload = multer({ storage });

app.post('/users', usersController.createUser);
app.post('/login', usersController.loginUser);
app.post('/users/admin', authBasic, usersController.addAdmin);

app.post('/recipes', authBasic, recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getOneRecipe);
app.put('/recipes/:id', authBasic, recipesController.editOneRecipe);
app.delete('/recipes/:id', authBasic, recipesController.deleteOneRecipe);
app.put('/recipes/:id/image/', authBasic, upload.single('image'), recipesController.addImage);
app.get('/images/:id', recipesController.showImage);

module.exports = app;
