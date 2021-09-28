const express = require('express');
// const multer = require('multer');
const bodyParser = require('body-parser');
const users = require('../controllers/users');
const { userValidation } = require('../midddlewares/uservalidation');
const { loginValidation } = require('../midddlewares/loginvalidation');
const { recipesValidation } = require('../midddlewares/recipesvalidation');
const { validateToken } = require('../midddlewares/tokenvalidation');
const { 
  create,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  // addImage,
 } = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './src/uploads');
//   },
//   filename: (req, file, callback) => {
//     const { id } = req.params;
//     callback(null, `${id}.jpeg`);
//   },
// });

// const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userValidation, users.createUser);
app.post('/login', loginValidation, users.createToken);

// app.put('/recipes/:id/image/', upload.single('image'), addImage);

app.post('/recipes', validateToken, recipesValidation, create);
app.get('/recipes', getAll);
app.get('/recipes/:id', findById);
app.put('/recipes/:id', validateToken, updateRecipe);
app.delete('/recipes/:id', validateToken, deleteRecipe);

module.exports = app;
