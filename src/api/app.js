const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const auth = require('../middlewares/authMiddleware');

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
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

app.post('/users', userController.create);

app.post('/login', userController.login);

app.post('/recipes', auth, recipeController.create);

app.get('/recipes', recipeController.getAll);

app.get('/recipes/:id', recipeController.getById);

app.put('/recipes/:id', auth, recipeController.update);

app.delete('/recipes/:id', auth, recipeController.remove);

app.put('/recipes/:id/image', auth, upload.single('image'), recipeController.addImage);

module.exports = app;
