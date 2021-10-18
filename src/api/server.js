const bodyParser = require('body-parser');
const multer = require('multer');

const validateJWT = require('./auth/validateJWT');
const app = require('./app');
const User = require('../controllers/users');
const Recipe = require('../controllers/recipes');

app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, 'src/uploads');
    },
    filename: (req, _file, callback) => {
        callback(null, `${req.params.id}.jpeg`);
    },
});

const upload = multer({ storage });

app.post('/users', User.create);
app.post('/users/admin', validateJWT, User.createAdmin);
app.post('/login', User.login);
app.post('/recipes', validateJWT, Recipe.create);
app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.getById);
app.put('/recipes/:id', validateJWT, Recipe.updateRecipe);
app.delete('/recipes/:id', validateJWT, Recipe.deleteRecipe);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), Recipe.addImage);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
