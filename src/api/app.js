  const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const authToken = require('./middlewares/authMiddleware');
const adminToken = require('./middlewares/authMiddlewareAdmin');
const recipesController = require('./controllers/recipesController');
const upMiddleware = require('./middlewares/uploadMiddleware');

require('dotenv').config();
 

const app = express();
app.use(bodyParser.json());
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, '../uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });
app.use('../uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.register);
app.post('/login', loginController.login);
app.post('/recipes', authToken, recipesController.register);
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', adminToken, recipesController.update);
app.delete('/recipes/:id', adminToken, recipesController.remove);
app.put('/recipes/:id/image', adminToken, upload.single('image'), upMiddleware.uploadMiddleware);

module.exports = app;
