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

const usersController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const validUsers = require('./middlewares/userMiddleware');
const { authenticationMiddleware } = require('./middlewares/authenticationMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validUsers.validateFields, usersController.createUser);
app.post('/login', usersController.findByPersonalData);
app.post('/recipes', authenticationMiddleware, recipeController.createRecipe);
app.get('/recipes', recipeController.getAll);
app.get('/recipes/:id', recipeController.getById);
app.put('/recipes/:id', authenticationMiddleware, recipeController.editRecipe);
app.put('/recipes/:id/image', authenticationMiddleware, upload.single('image'), 
recipeController.addImage);
app.delete('/recipes/:id', authenticationMiddleware, recipeController.deleteRecipe);

module.exports = app;
