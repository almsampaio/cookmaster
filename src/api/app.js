const express = require('express');
const bodyParser = require('body-parser').json();
const path = require('path');
const multer = require('multer');

const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');
const { validateToken, validateUser } = require('../middleware/validation');

const app = express();
app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.post('/users', usersController.userRegistration);
app.post('/login', loginController.userLogin);
app.post('/recipes', validateToken, recipesController.recipesSubmit);
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', validateToken, validateUser,
  recipesController.editRecipe);
app.delete('/recipes/:id', validateToken, validateUser,
  recipesController.delRecipe);
  app.put('/recipes/:id/image', upload.single('image'), validateToken,
  recipesController.addImage);

module.exports = app;
