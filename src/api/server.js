const bodyParser = require('body-parser');

const app = require('./app');

const routes = require('../routes');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
