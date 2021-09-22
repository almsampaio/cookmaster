// CONTROLLER

const userService = require('../../services/userService');

const createUserController = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userService.createUserService(name, email, password);
    return res.status(user.status).json(user.message);
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const login = await userService.loginService(email, password);
    return res.status(login.status).json(login.message);
};

module.exports = { 
    createUserController, 
    loginController,
};