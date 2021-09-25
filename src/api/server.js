// const bodyParser = require('body-parser');
const app = require('./app');

// const controllersUsers = require('../controllers/usersControlles');
// const controllersLogin = require('../controllers/loginControlles');

// app.use(bodyParser.json());

// const PORT = 3000;

const PORT = process.env.PORT || 3000;

// app.post('/users', controllersUsers.created);

// app.post('/login', controllersLogin.loginUsers);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
