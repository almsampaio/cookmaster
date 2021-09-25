const { Router } = require('express');
const { 
    createUserController, 
    loginController,
    getAllUsersController,
    deleteAllUsersController,
  } = require('../controllers/users/userController');

const usersRouter = Router();

usersRouter.get('/getall', getAllUsersController);
usersRouter.post('/users', createUserController);
usersRouter.post('/login', loginController);
usersRouter.delete('/deleteall', deleteAllUsersController);

module.exports = usersRouter;