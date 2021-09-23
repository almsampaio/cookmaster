const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = require('./app');
const usersRouter = require('./Router/usersRouter');
const loginRouter = require('./Router/loginRouter');
const recipesRouter = require('./Router/recipesRouter');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
