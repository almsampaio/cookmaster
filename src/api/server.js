require('dotenv').config();
const bodyParser = require('body-parser');
const route = require('./routes');
const app = require('./app');
const Validated = require('../services/auth/ValidateJWT');

const { PORT } = process.env;
app.use(bodyParser.json());

app.post('/login', route.login);
app.post('/users', route.createUser);
app.post('/recipes', Validated, route.createRecipes);

app.listen(
  PORT,
  () => console.log(`conectado na porta ${PORT}`),
);
