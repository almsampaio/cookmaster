const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const user = require('../controllers/userController');
const login = require('../controllers/loginController');
const recipes = require('../controllers/recipesControllers');
const userValidations = require('../middlewares/userValidations');
const loginValidations = require('../middlewares/loginValidations');
const recipesValidations = require('../middlewares/recipesValidations');
const token = require('../middlewares/token');

const app = express();
app.use(bodyParser.json());

app.post('/users', 
  userValidations.validateName, 
  userValidations.validateEmail,
  userValidations.validatePassword, 
  user.create);

app.post('/login',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  login.login);

app.post('/recipes',
  recipesValidations.validateName,
  recipesValidations.validateIngredients,
  recipesValidations.validatePreparation,
  token.validateToken,
  recipes.create);

app.get('/recipes', recipes.getAll);
app.get('/recipes/:id', recipes.getById);

app.put('/recipes/:id',
  token.validateToken,
  recipes.update);

app.delete('/recipes/:id',
  token.validateToken,
  recipes.remove);

// upload img requsito 9 
// storage e upload foram pegos do course trybe bloco 28
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (_req, file, callback) => {
    callback(null, file.originalname);
} });

const upload = multer({ storage });

app.put('/recipes/:id/image/',
  token.validateToken,
  upload.single('image'),
  recipes.upload);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
