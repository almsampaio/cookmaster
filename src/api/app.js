const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // para organizar caminhos de diretórios
const multer = require('multer');

const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');

const {
  authMiddleware, validateName, validateIngredients,
  validatePreparation, validateUser } = require('../middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads')); // vai pegar o __dirname (que é o diretório atual, e vai olhar para outros diretórios em outros níveis procurando uma pasta chamada uploads)
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadImage = multer({ storage });

app.post('/users', usersController.create);
app.get('/users', usersController.getUsers);

app.post('/login', usersController.userLogin);

app.post('/recipes', validateName, validateIngredients, validatePreparation,
authMiddleware, recipesController.create);
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);
app.put('/recipes/:id', validateUser, recipesController.updateRecipe);
app.delete('/recipes/:id', validateUser, recipesController.deleteRecipe);

app.put('/recipes/:id/image', validateUser,
uploadImage.single('image'), recipesController.uploadImage);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
