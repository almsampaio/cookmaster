const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routerUser = require('./routerUser');
const routerRecipes = require('./routerRecipes');
const routerAdmin = require('./routerAdmin');

const app = express();

app.use(bodyParser.json());

app.use(express.static(`${__dirname}../uploads`));

app.use('/users', routerUser.Userrouter);
app.use('/users', routerAdmin.Adminrouter);
app.use('/login', routerUser.Authentication);
app.use('/recipes', routerRecipes.Recipesrouter);
// https://qastack.com.br/programming/5924072/express-js-cant-get-my-static-files-why
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
