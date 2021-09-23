const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const {
  createUser,
  login,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  authMiddleware, 
  updateRecipe,
  updateRecipeImage,
  removeRecipe } = require('./routes');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);

app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', authMiddleware, createRecipe);

app.put('/recipes/:id', authMiddleware, updateRecipe);
app.put('/recipes/:id/image', authMiddleware, upload.single('image'), updateRecipeImage);

app.delete('/recipes/:id', authMiddleware, removeRecipe);

module.exports = app;
