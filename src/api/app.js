const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const userMiddlewares = require('../middlewares/userMiddlewares');
const recipeMiddlewares = require('../middlewares/recipeMiddlewares');
const authMiddlewares = require('../middlewares/authMiddlewares');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Users
app.post('/users', 
userMiddlewares.validateName,
userMiddlewares.validateEmail,
userController.create);

app.post('/login', 
userMiddlewares.validateLogin, 
userController.login);

// Recipes
app.post('/recipes', 
recipeMiddlewares.validateRecipe,
authMiddlewares.authValidation,
recipeController.create);

app.get('/recipes', 
recipeController.getAll);

app.get('/recipes/:id', 
recipeController.getById);

app.put('/recipes/:id',
authMiddlewares.authValidation,
recipeController.update);

app.delete('/recipes/:id',
authMiddlewares.authValidation,
recipeController.exclude);

const dirUploads = path.join(__dirname, '..', 'uploads');
const recipeModel = require('../models/recipeModel');
const connect = require('../models/connection');

const storage = multer.diskStorage({
  destination: dirUploads,
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

app.put('/recipes/:id/image/', 
authMiddlewares.authValidation,
  upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const { _id } = req.user;
  if (!ObjectId.isValid(id)) return null;
  const recipe = await recipeModel.getById();
  const db = await connect();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { ...recipe, userId: _id, image: `localhost:3000/src/uploads/${filename}` } });
  const recipeToUpdate = await recipeModel.getById(id);
  console.log(recipeToUpdate);
  res.status(200).json(recipeToUpdate);
});

app.use('/images', express.static('src/uploads/'));

module.exports = app;
