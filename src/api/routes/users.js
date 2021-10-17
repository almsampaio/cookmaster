const { Router } = require('express');
const { create, createAdm } = require('../controllers/users');
const authAdm = require('../middlewares/admAuth');
const userValidation = require('../middlewares/userValidation');

const usersRouter = Router();

usersRouter.post('/', userValidation, create);
usersRouter.post('/admin', authAdm, createAdm);

module.exports = usersRouter;