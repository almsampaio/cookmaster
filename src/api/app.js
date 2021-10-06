const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { validateRecipe,
  validateIdFormat,
  validateExistingRecipe,
  validateUserRole,
  validateFile } = require('../middlewares/validateData');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => {
    const { _id } = req.params;
    return callback(null, `${_id}.jpeg`); 
  },
});

const upload = multer({ storage });

const usersControllers = require('../controllers/usersControllers');
const validateJWT = require('../middlewares/validateJWT');
const recipesControllers = require('../controllers/recipesControllers');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.resolve('uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersControllers.create);
app.post('/login', usersControllers.login);
app.post('/recipes', validateJWT, validateRecipe, recipesControllers.create);
app.get('/recipes', recipesControllers.getAll);
app.put('/recipes/:_id/image',
validateJWT,
upload.single('image'),
validateIdFormat,
validateExistingRecipe,
validateUserRole,
validateFile,
recipesControllers.uploadPicture);
app.get('/recipes/:_id', validateIdFormat, validateExistingRecipe, recipesControllers.getById);
app.put('/recipes/:_id',
validateJWT,
validateIdFormat,
validateRecipe,
validateUserRole,
recipesControllers.update);
app.delete('/recipes/:_id',
validateJWT,
validateIdFormat,
validateExistingRecipe,
validateUserRole,
recipesControllers.deleteOne);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
