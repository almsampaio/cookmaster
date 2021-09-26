const express = require('express');
const multer = require('multer');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userData = require('../middlewares/userValidations');
const loginData = require('../middlewares/loginValidations');
const recipesData = require('../middlewares/recepiesValidations');
const token = require('../middlewares/token');

const usersControllers = require('../controllers/usersControllers');
const loginControllers = require('../controllers/loginControllers');
const recepiesControllers = require('../controllers/recepiesControllers');

app.post('/users',
userData.nameVerify,
userData.emailVerify,
userData.emailVerifyExists,
usersControllers.createUser);

app.post('/login',
loginData.emailVerify,
loginData.passwordVerify,
loginData.emailVerifyValid,
loginData.passwordVerifyValid,
loginControllers.userLogin);

app.post('/recipes',
recipesData.nameVerify,
recipesData.ingredientsVerify,
recipesData.preparationVerify,
token.tokenValidation,
recepiesControllers.createRecepie);

app.get('/recipes', recepiesControllers.showRecipes);
app.get('/recipes/:id', recepiesControllers.showRecipesByID);

app.put('/recipes/:id',
token.tokenValidation,
recepiesControllers.updateRecipe);

app.delete('/recipes/:id',
token.tokenValidation,
recepiesControllers.deleteRecipe);

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (request, _file, callback) => {
    callback(null, `${request.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

app.put('/recipes/:id/image/',
token.tokenValidation,
upload.single('image'),
recepiesControllers.insertImage);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
