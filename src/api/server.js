const bodyParser = require('body-parser');

const validateJWT = require('./auth/validateJWT');
const app = require('./app');
const User = require('../controllers/users');
const Recipe = require('../controllers/recipes');

app.use(bodyParser.json());

app.post('/users', User.create);
app.post('/login', User.login);
app.post('/recipes', validateJWT, Recipe.create);
app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.getById);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
