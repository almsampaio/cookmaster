const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const validateJWT = require('./auth/validateJWT');

const userControllers = require('../controllers/userControllers');
const recipesControllers = require('../controllers/recipesControllers');
const adminControllers = require('../controllers/adminControllers');
const storage = require('../middlewares/uploadFIle');

const upload = multer({ storage });
const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userControllers.postUser);
app.post('/login', userControllers.postLogin);
app.post('/recipes', validateJWT, recipesControllers.postRecipes);
app.post('/users/admin', validateJWT, adminControllers.postAdmin);

app.get('/recipes', recipesControllers.getRecipes);
app.get('/recipes/:id', recipesControllers.getRecipesById);
app.get('/images/:imageId', recipesControllers.getImageById);

app.put('/recipes/:id', validateJWT, recipesControllers.putRecipesById);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), recipesControllers.putImage);

app.delete('/recipes/:id', validateJWT, recipesControllers.deleteRecipesbyId);

module.exports = app;
