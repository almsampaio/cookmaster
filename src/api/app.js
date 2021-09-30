const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const usersControllers = require('./controllers/usersControllers');
const recipesControllers = require('./controllers/recipesControllers');
const valideUser = require('./middlewares/usersValidations');
const valideRecipe = require('./middlewares/recipesValidations');
const tokenValidation = require('./middlewares/tokenValidation');

const PATH_JOIN = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: PATH_JOIN,
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', valideUser.usersVAlidations, valideUser.emailExists, usersControllers.create);
app.post('/login', valideUser.loginValitation, valideUser.checkUser, usersControllers.login);

app.post('/recipes', tokenValidation, valideRecipe.usersVAlidations, recipesControllers.create);
app.get('/recipes', recipesControllers.get);
app.get('/recipes/:id', valideRecipe.validId, recipesControllers.getById);
app.put('/recipes/:id', tokenValidation, recipesControllers.put);
app.delete('/recipes/:id', tokenValidation, recipesControllers.destroy);
app.put('/recipes/:id/image', tokenValidation, upload.single('image'), recipesControllers.upload);

module.exports = app;
