const { Router } = require('express');
const { auth } = require('../controllers/auth');

const authRouter = Router();

authRouter.post('/', auth);

module.exports = authRouter;