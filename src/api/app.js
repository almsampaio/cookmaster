const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const userController = require('../controllers/user');
const recipesController = require('../controllers/recipes');
const { authToken } = require('../middlewares/authToken');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer(storage);
app.use(express.static('../uplodas'));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.addUser);

app.post('/login', userController.login);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/images/:id.jpeg', recipesController.getImageId);

app.put('/recipes/:id/image/',
authToken,
upload.single('image'),
recipesController.addImageRecipe);

app.delete('/recipes/:id', authToken, recipesController.deleteRecipeId);
app.put('/recipes/:id', authToken, recipesController.updateRecipeId);
app.get('/recipes/:id', recipesController.recipeId);
app.post('/recipes', authToken, recipesController.addRecipe);
app.get('/recipes', recipesController.allRecipes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'page Not Found' });
});

app.use(errorMiddleware);

module.exports = app;
