const app = require('./app');

const Users = require('../controllers/UsersController');
const Validation = require('../middlewares/middlewares');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users', [
  Validation.validateName, 
  Validation.validateEmail, 
  Validation.validatePassword,
  Users.createUser,
  ]);

app.post('/login', Users.userLogin);
