const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

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

const userControlers = require('../Controllers/userControllers');
const middleware = require('../Services/middlewares');
const recipesControlers = require('../Controllers/recipesController');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
// Onde vão ficar as rotas

app.post('/users', userControlers.create);

app.post('/login', userControlers.login);

app.post('/recipes', middleware.create, recipesControlers.createRecipe);

app.get('/recipes', recipesControlers.getAllRecipe);

app.get('/recipes/:id', recipesControlers.getRecipeById);

app.put('/recipes/:id', middleware.create, recipesControlers.updateRecipe);

app.delete('/recipes/:id', middleware.create, recipesControlers.removeRecipe);

app.put('/recipes/:id/image', middleware.create, upload.single('image'),
recipesControlers.updateImage);

module.exports = app;

// ref https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-upload-de-arquivos-com-%60multer%60/4619ea0e-6322-4165-b33f-64cef49676af/conteudo/83e8d41b-499b-4de7-b088-8a1c8ec40013/multipartform-data/c388062c-028a-452e-b2fa-bd58c4c5c321?use_case=side_bar
