const express = require('express');
const { route: staticImages } = require('./services/multerConfig');

const app = express();

app.use(express.json());
app.use('/images', staticImages);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

require('./controllers/users')(app);
require('./controllers/login')(app);
require('./controllers/recipes')(app);

module.exports = app;
