const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const controllers = require('../controllers');
const { authMiddleware } = require('../middlewares/jwtAuthMiddleware');
const { errorMiddleware } = require('../middlewares/errorMiddleware');
const { upload } = require('../middlewares/multerMiddleware');

const app = express();

app.use(bodyParser.json());

app.post('/users', rescue(controllers.registerUser));
app.post('/login', rescue(controllers.logUserIn));

app.post('/recipes', authMiddleware, rescue(controllers.createRecipe));
app.get('/recipes/:id', rescue(controllers.getRecipesById));
app.get('/recipes', rescue(controllers.getAllRecipes));
app.put('/recipes/:id', rescue(authMiddleware), rescue(controllers.updateRecipe));
app.delete('/recipes/:id', rescue(authMiddleware), rescue(controllers.deleteRecipe));

app.put('/recipes/:id/image',
  rescue(authMiddleware),
  upload.single('image'),
  rescue(controllers.updateRecipeWithImage));

app.use(errorMiddleware);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send('Hello my baby, hello my honey ...');
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
