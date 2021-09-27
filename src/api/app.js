const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const controllersUsers = require('../controllers/usersControlles');
const controllersLogin = require('../controllers/loginControlles');
const controllersRecipes = require('../controllers/recipesControlles');

const app = express();

app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, '..', 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const pathJoin = path.join(__dirname, '..', 'uploads'); // rota para 'uploads';

const storage = multer.diskStorage({
  destination: pathJoin,
  //  (_req, _file, callback) => {
  //   callback(null, 'src/uploads'); // definição da rota da pasta
  // },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
    // callback(null, `${file.fieldname}.jpeg`);
  },
});

const upload = multer({ storage });

// const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });
// const upload = multer({ dest: './uploads' });

app.post('/users', controllersUsers.created);

app.post('/login', controllersLogin.loginUsers);

app.post('/recipes', controllersRecipes.createRecipe);

app.get('/recipes', controllersRecipes.getAllRecipes);

app.get('/recipes/:id', controllersRecipes.getByIdRecipe);

app.put('/recipes/:id', controllersRecipes.updateRecipe);

app.delete('/recipes/:id', controllersRecipes.excludeRecipe);

app.put('/recipes/:id/image/', upload.single('image'), controllersRecipes.updateFile);

// app.post('/file/uploads', upload.single('file'),
//   (req, res) => { // testando
//     res.send(req.file);
//     // res.send(req.file.filename);
//     // res.send(req.body);
//     // res.send(req.params);
// });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
