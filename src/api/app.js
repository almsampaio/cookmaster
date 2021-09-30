const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');
const { tokenAuthorization } = require('../../services/tokenAuthorization');

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

const upload = multer({ storage });

app.post('/users', userController.registerUser);

app.post('/login', userController.checkLogin);

app.post('/recipes', tokenAuthorization, recipeController.registerRecipe);

app.get('/recipes', recipeController.getRecipes);

app.get('/recipes/:id', recipeController.gettingOneRecipe);

app.put('/recipes/:id', tokenAuthorization, recipeController.editingRecipe);

app.delete('/recipes/:id', tokenAuthorization, recipeController.deletingRecipe);

app.put('/recipes/:id/image/',
tokenAuthorization,
upload.single('image'),
recipeController.addingImage);

app.use('/images', express.static('src/uploads/'));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
