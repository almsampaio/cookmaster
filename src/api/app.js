const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const users = require('../controllers/usersController');
const recipes = require('../controllers/recipesController');
const validUser = require('../middlewares/validUser');

const jwt = require('../middlewares/jwtValidate');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads/'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', users.addUser);
app.post('/login', users.login);
app.post('/recipes', jwt, recipes.addRecipe);
app.get('/recipes', recipes.getAllRecipes);
app.get('/recipes/:id', recipes.getRecipeById);
app.put('/recipes/:id', jwt, recipes.updateRecipe);
app.delete('/recipes/:id', jwt, recipes.deleteRecipe);
app.put(
  '/recipes/:id/image',
  jwt,
  validUser,
  upload.single('image'),
  recipes.addRecipeImage,
);

module.exports = app;
