const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const routes = require('./routes');
const { handleErrors } = require('../Middlewares/erros');
const { validateNewUser, validateLogin, validateNewRecipe } = require('../Middlewares/usersMid');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.get('/', (request, response) => {
  response.send();
});

const apiRoutes = express.Router();
apiRoutes.post('/users', validateNewUser, routes.createUser);
apiRoutes.post('/login', validateLogin, routes.login);
apiRoutes.post('/recipes', validateJWT, validateNewRecipe, routes.createRecipe);
apiRoutes.get('/recipes/:id', routes.getById);
apiRoutes.get('/recipes', routes.getAll);
apiRoutes.put('/recipes/:id', validateJWT, validateNewRecipe, routes.update);
apiRoutes.delete('/recipes/:id', validateJWT, routes.remove);
apiRoutes.put('/recipes/:id/image/', validateJWT, upload.single('image'), routes.addImage);

app.use(apiRoutes);
app.use(handleErrors);

module.exports = app;

// FONTE: https://github.com/tryber/nodejs-jwt-base-project/blob/block-28-3/src/api/app.js
