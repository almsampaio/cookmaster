const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const upload = require('../middleware/upload');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    const { _id } = req.params;
    callback(null, `${_id}.jpeg`);
  },
});
const uploadd = multer({ storage });
app.use('src/uploads', express.static(path.join(__dirname, '..', 'src/uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUSers);

app.post('/login', loginController.login);

app.post('/recipes', auth.validateJWT, recipeController.createRecipe);

app.get('/recipes', recipeController.getRecipes);

app.get('/recipes/:_id', recipeController.getRecipeById);

app.put('/recipes/:_id', admin, recipeController.editeRecipe);

app.delete('/recipes/:_id', admin, recipeController.deleteRecipe);

app.put('/recipes/:_id/image', admin, uploadd.single('image'), upload.uploadMiddleware);

module.exports = app;
