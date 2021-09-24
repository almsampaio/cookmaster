const app = require('./app');

const { PORT } = require('../data');

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
