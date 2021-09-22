const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
