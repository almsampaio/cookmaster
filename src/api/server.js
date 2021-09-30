const bodyParser = require('body-parser');
const route = require('./routes');
const app = require('./app');
const Validated = require('../services/auth/ValidateJWT');

const PORT = 3000;
app.use(bodyParser.json());

app.post('/login', route.login);
app.post('/users', route.createUser);
app.post('/recipes', Validated, route.createRecipes);
app.get('/recipes', route.allRecipes);
app.get('/recipes/:id', route.recipById);

app.listen(
  PORT,
  () => console.log(`conectado na porta ${PORT}`),
);
