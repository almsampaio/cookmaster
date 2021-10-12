const { Router } = require('express');
const { create } = require('../controllers/users');
const userValidation = require('../middlewares/userValidation');

const usersRouter = Router();

usersRouter.post('/', userValidation, create);

module.exports = usersRouter;