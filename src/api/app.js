const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { validateUsers } = require('../Services/usersService');
const { validateLogin } = require('../Services/loginService');
const { validateRecipes } = require('../Services/recipesService'); 
const { validateToken } = require('../middlewares/Jwt');
const usersController = require('../Controllers/usersController');
const loginController = require('../Controllers/loginController');
const recipesController = require('../Controllers/recipesController');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipesId);
app.post('/users', validateUsers, usersController.create);
app.post('/login', validateLogin, loginController.login);
app.post('/recipes', validateToken, validateRecipes, recipesController.createdRecipes);
app.put('/recipes/:id', validateToken, validateRecipes, recipesController.updatedRecipes);
app.delete('/recipes/:id', validateToken, recipesController.deletedRecipes);
app.put('/recipes/:id/image/', validateToken, upload.single('image'), recipesController.updateImg);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('teste');
});
// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
