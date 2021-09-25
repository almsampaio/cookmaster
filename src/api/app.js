const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../utils/validateJWT');

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'src/uploads'); },
  filename: (req, file, callback) => { callback(null, `${req.params.id}.jpeg`); },
});

const upload = multer({ storage });

app.get('/users/all', usersController.getAllUsers);

app.get('/users/email', usersController.getByEmail);

app.post('/users', usersController.createUser);

app.post('/login', usersController.loginUser);

app.get('/recipes', recipesController.getAllRecipes);

app.get('/recipes/:id', recipesController.getRecipeById);

app.post('/recipes', validateJWT.validateJWT, recipesController.createRecipe);

app.put('/recipes/:id', validateJWT.validateJWT, recipesController.updateRecipe);

app.delete('/recipes/:id', validateJWT.validateJWT, recipesController.deleteRecipe);

app.put('/recipes/:id/image', upload.single('image'),
validateJWT.validateJWT, recipesController.uploadImage);

app.get('/images/:id.jpeg', recipesController.getImage);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
