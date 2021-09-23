const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const multer = require('multer');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const postRecipieController = require('../controllers/postRecipieController');
const authMiddleware = require('../middlewares/authMiddleware');
const valUserMid = require('../middlewares/validateUserMiddleware');
const getRecipieController = require('../controllers/getRecipeController');
const imageCont = require('../controllers/imageController');

const app = express();

app.use(bodyparser.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.post('/users', userController);
app.post('/login', loginController);
app.post('/recipes', authMiddleware, postRecipieController);
app.get('/recipes', getRecipieController.getAll);
app.put('/recipes/:id/image', 
authMiddleware, valUserMid, upload.single('image'), imageCont.addImage);
app.get('/images/:filename', imageCont.getByName);
app.get('/recipes/:id', getRecipieController.getById);
app.put('/recipes/:id', authMiddleware, valUserMid, getRecipieController.updateById);
app.delete('/recipes/:id', authMiddleware, valUserMid, getRecipieController.deleteById);

module.exports = app;
