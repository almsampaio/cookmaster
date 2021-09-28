const app = require('./app');
const user = require('../controllers/userController');
const rescue = require('../rescue/rescue');

const PORT = 3000;

app.post('/users', user.createProduct, rescue);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
