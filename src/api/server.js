const app = require('./app');
const user = require('../controllers/userController');
const rescue = require('../rescue/rescue');

const PORT = 3000;

app.post('/users', user.createUser, rescue);
app.post('/login', user.loginController, rescue);

app.listen(PORT, () => console.log('Boraaa torradeira !'));
