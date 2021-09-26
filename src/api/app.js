const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/usersController');
const recipeController = require('../controllers/recipesController');
const middlewares = require('../middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.post('/login', userController.findUser);

app.get('/users', userController.getAll);

app.post('/users', userController.create);

app.get('/recipes/:id', recipeController.getById);

app.put('/recipes/:id/image', middlewares.authToken, upload.single('image'),
  recipeController.uploadImage);

app.put('/recipes/:id', middlewares.authToken, recipeController.update);

app.delete('/recipes/:id', middlewares.authToken, recipeController.remove);

app.get('/recipes', recipeController.getAll);

app.post('/recipes', middlewares.authToken, recipeController.create);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
