const app = require('./app');
const routes = require('./routes');

const PORT = 3000;

app.use(routes);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
