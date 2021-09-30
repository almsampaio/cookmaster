const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipesController');
const validateWebToken = require('./auth/validateToken');

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static('src/uploads/'));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// fazendo multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`); 
  },
  
});
// multer recebe o objeto q contem o destino do arquivo enviado
const upload = multer({ storage });

app.get('/recipes', recipeController.getAll);
app.get('/recipes/:id', recipeController.getById);

app.post('/users', usersController.create);
app.post('/login', loginController.logIn);
app.post('/recipes', validateWebToken, recipeController.create);

app.put('/recipes/:id', validateWebToken, recipeController.update);
app.put('/recipes/:id/image', validateWebToken, 
          upload.single('image'), recipeController.imageAdded);

app.delete('/recipes/:id', validateWebToken, recipeController.exclude);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
