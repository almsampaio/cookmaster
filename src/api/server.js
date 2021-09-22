const bodyParser = require('body-parser');

const app = require('./app');
const User = require('../controllers/users');
const Login = require('../controllers/login');

app.use(bodyParser.json());
app.post('/users', User.create);
app.post('/login', Login.login);
// app.get('/users', User.getByEmail);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
