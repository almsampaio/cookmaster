const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const controllerUsers = require('../controllers/users');
const controllerLogin = require('../controllers/login');
const controllerRecipes = require('../controllers/recipes');
const { jwtAdminVerify } = require('../auth/authBasic');

const app = express();

app.use(bodyParser.json());

const pathJoin = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: pathJoin,
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

app.post('/users', controllerUsers.create);
app.post('/users/admin', jwtAdminVerify, controllerUsers.createAdmin);

app.post('/login', controllerLogin.loginUser);

app.post('/recipes', controllerRecipes.create);
app.get('/recipes', controllerRecipes.getAll);
app.get('/recipes/:id', controllerRecipes.getById);
app.put('/recipes/:id', controllerRecipes.update);
app.delete('/recipes/:id', controllerRecipes.deleteOne);
app.put('/recipes/:id/image', upload.single('image'), controllerRecipes.updateFile);
app.use('/images', express.static(pathJoin));

module.exports = app;
