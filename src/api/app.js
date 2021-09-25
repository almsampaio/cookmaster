const express = require('express');
const bodyParser = require('body-parser');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '/uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const usersController = require('./controllers/UsersController');
const recipesController = require('./controllers/RecipesController');

const validateUsers = require('./middlewares/UsersValidation');
const { authMiddleware } = require('./middlewares/AuthMiddleware');

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validateUsers.validateFields, usersController.createUser);
app.post('/login', usersController.findByCredentials);

app.post('/recipes', authMiddleware, recipesController.createRecipe);
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', authMiddleware, recipesController.updateRecipe);
app.delete('/recipes/:id', authMiddleware, recipesController.removeRecipe);
app.put('/recipes/:id/image',
  authMiddleware, 
  upload.single('image'), 
  recipesController.updateImage);

module.exports = app;
