const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const recipeMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

app.get('/', (_request, response) => {
  response.send();
});

app.post('/users', userController.create);
app.post('/login', userController.findByCredentials);

app.post('/recipes', recipeMiddleware.validateJWT, recipeController.create);
app.get('/recipes', recipeController.getAll);
app.get('/recipes/:id', recipeController.getById);
app.put('/recipes/:id', recipeMiddleware.validateJWT, recipeController.update);
app.delete('/recipes/:id', recipeMiddleware.validateJWT, recipeController.exclude);
app.put('/recipes/:id/image', recipeMiddleware.validateJWT, 
  upload.single('image'), recipeController.updateImage);
app.use('/images', express.static('src/uploads'));

module.exports = app;