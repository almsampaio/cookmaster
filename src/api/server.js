require('dotenv').config();
// const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./routes');
const app = require('./app');

const { PORT } = process.env;
app.use(bodyParser.json());

app.post('/users', route.createUser);
app.post('/login', route.login);

app.listen(
  PORT,
  () => console.log(`conectado na porta ${PORT}`),
);
