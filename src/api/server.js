const bodyParser = require('body-parser');
const app = require('./app');
const middlewaresUser = require('./middlewares/usersMiddlewares');
const userController = require('./controllers/usersController');

const PORT = 3000;

app.use(bodyParser.json());

app.post('/users', middlewaresUser.validateEmailAlreadyExists,
userController.createUser);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
