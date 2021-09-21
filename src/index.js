const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.listen(port, () => console.log('partiu'));