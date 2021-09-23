const express = require('express');
const bodyParser = require('body-parser');
const users = require('../controllers/users');
const { userValidation } = require('../midddlewares/uservalidation');
// const { 
//   create,
//   getAll,
//   findById,
//   updateRecipe,
//   deleteRecipe,
//  } = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userValidation, users.createUser);
// app.post('/login', users.createToken);

// app.post('/recipes', create);
// app.get('/recipes', getAll);
// app.get('/recipes/:id', findById);
// app.put('/recipes/:id', updateRecipe);
// app.delete('/recipes/:id', deleteRecipe);

module.exports = app;
