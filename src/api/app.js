const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const userControllers = require('../controllers/users');
const recipesController = require('../controllers/recipes');
const middleware = require('../middleware/validateToken');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'upload')));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, './src/uploads');
  },
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

app.post('/users', userControllers.create);
app.post('/login', userControllers.findUser);
app.post('/recipes', middleware.checkToken, recipesController.createRecipes);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id/image', middleware.checkToken,
upload.single('image'), recipesController.uploadImage);
app.get('/recipes', recipesController.getAll);
app.put('/recipes/:id', middleware.checkToken, recipesController.update);
app.delete('/recipes/:id', middleware.checkToken, recipesController.remove);
app.get('/images/:id', recipesController.getImage);

module.exports = app;
