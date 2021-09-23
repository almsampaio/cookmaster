const express = require('express');
const bodyParser = require('body-parser');

const Users = require('../controllers/usersController');
const Recipes = require('../controllers/recipesController');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Endpoint para Usuários

app.post('/users', Users.create);
app.post('/login', Users.login);

// Endpoint para Receitas

app.post('/recipes', validateJWT, Recipes.create);
app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.findById);
app.put('/recipes/:id', validateJWT, Recipes.update);
app.delete('/recipes/:id', validateJWT, Recipes.deleteInfo);
app.put('/recipes/:id/image', validateJWT, Recipes.upload.single('image'), Recipes.updateImage);

// Enpoint para Imagens

// app.get('/images/:id', Recipes.getImage);
app.use('/images', express.static('src/uploads/'));

module.exports = app;

/* A resolução de uma maneira mais direta do Requisito 10 eu acabei acatando 
  a maneira do Adelino Júnior: https://github.com/AdelinoJnr 
  pois com o jeito que eu estava fazeno não chegou a funcionar 
  e vi que eu estava sendo muito redundante no código. */ 

// Source https://stackoverflow.com/questions/28143419/express-static-keeps-routing-my-files-from-the-route