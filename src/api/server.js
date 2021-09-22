const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');

const app = express();
app.use(bodyParser.json());

app.use(router);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
