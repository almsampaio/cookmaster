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

app.post('/login', Users.login);

// Endpoint para Usuários

app.post('/users', Users.create);
app.post('/users/admin', validateJWT, Users.createAdmin);

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

/* A resolução mais direta do Requisito 10 eu acabei acatando 
  a maneira do Adelino Júnior: https://github.com/AdelinoJnr 
  pois com o jeito que eu estava fazendo não chegou a funcionar 
  e vi que eu estava sendo muito redundante no código. */ 

// Para adicionar mais contexto ao Requisito 10 eu busquei entender mais sobre através do link: https://expressjs.com/pt-br/starter/static-files.html
