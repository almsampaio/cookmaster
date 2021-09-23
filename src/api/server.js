const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = require('./app');
const User = require('../controllers/users');
const Login = require('../controllers/login');
const Recipes = require('../controllers/recipes');
const validateToken = require('../middlewares/validateToken');
const upload = require('../middlewares/uploadImage');

app.use(bodyParser.json());

app.post('/users', User.create);

app.post('/login', Login.login);

app.put('/recipes/:id/image',
validateToken,
upload.single('image'),
Recipes.uploadImage);

app.get('/recipes/:id', Recipes.getById);
app.put('/recipes/:id', validateToken, Recipes.updateRecipe);
app.delete('/recipes/:id', validateToken, Recipes.exclude);
app.post('/recipes', validateToken, Recipes.create);
app.get('/recipes', Recipes.getAll);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
