// projeto realizado com ajuda do estudante Nilson Ribeiro

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

// função auxiliar da função addImage
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadImg = multer({ storage });

// fim de função addImage

const { create } = require('../controllers/users');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { 
  addRecipes, 
  findRecipes, 
  findRecipeById, 
  editRecipe, 
  removeRecipe,
  addImage,
} = require('../controllers/recipe');

const { 
  nameValidation, 
  emailValidation, 
  emailExists,
} = require('../middlewares/validationUser');

const { 
  emailRequired, 
  passwordRequired, 
  emailValid, 
  passwordValid,
} = require('../middlewares/validationLogin');

const {
  verifyName,
  verifyIngredients,
  verifyPreparation,
} = require('../middlewares/recipeValidation');

const { userLogin } = require('../controllers/login');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', nameValidation, emailValidation, emailExists, create);
app.post('/login', emailRequired, passwordRequired, emailValid, passwordValid, userLogin);
app.post('/recipes', 
verifyName, verifyIngredients, verifyPreparation, tokenValidation, addRecipes);
app.get('/recipes', findRecipes);
app.get('/recipes/:id', findRecipeById);
app.put('/recipes/:id', tokenValidation, editRecipe);
app.delete('/recipes/:id', tokenValidation, removeRecipe);
app.put('/recipes/:id/image/', tokenValidation, uploadImg.single('image'), addImage);

module.exports = app;
