const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');

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
// storage e upload foram pegos do course trybe bloco 28 https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-upload-de-arquivos-com-%60multer%60/4619ea0e-6322-4165-b33f-64cef49676af/conteudo/a66c00b4-d0d3-40e1-a4f6-ad01d3e4913e/show-me-the-code/d2be412b-7812-4a79-9b72-a78cc8bd1326?use_case=side_bar
// const storage = multer.diskStorage({
//   destination: (_req, _file, callback) => {
//     callback(null, 'uploads');
//   },
//   filename: (_req, file, callback) => {
//     callback(null, file.originalname);
// } });

// const upload = multer({ storage });

// app.put('/recipes/:id/image/',
//   token.validateToken,
//   upload.single('image'),
//   recipes.upload);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
