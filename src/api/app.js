const express = require('express');
const bodyParser = require('body-parser');

const multer = require('multer');

const app = express();

app.use(bodyParser.json());

const users = require('../middlewares/userValidation');
const login = require('../middlewares/loginValidation');
const recipes = require('../middlewares/recipesValidation');
const token = require('../middlewares/token');
const usersControllers = require('../controllers/userController');
const loginControllers = require('../controllers/loginController');
const recipesControllers = require('../controllers/recipesControllers');

app.post('/users',
users.nameValidate,
users.emailValidate,
users.emailExists,
usersControllers.create);

app.post('/login',
login.emailValidate,
login.passwordValidate,
login.emailVerifyValidate,
login.passwordVerifyValidate,
loginControllers.userLogin);

app.post('/recipes',
recipes.nameValidate,
recipes.ingredientsValidate,
recipes.preparationValidate,
token.tokenValidate,
recipesControllers.createRecipe);

app.get('/recipes', recipesControllers.getRecipes);

app.get('/recipes/:id', recipesControllers.getRecipeById);

app.put('/recipes/:id', token.tokenValidate, recipesControllers.updateRecipe);

app.delete('/recipes/:id', token.tokenValidate, recipesControllers.removeRecipe);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

app.put('/recipes/:id/image/',
token.tokenValidate,
upload.single('image'),
recipesControllers.imgInsert);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// ...

module.exports = app;
