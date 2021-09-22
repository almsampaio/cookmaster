// CONTROLLER

const userService = require('../../services/userService');

const createUserController = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userService.createUserService(name, email, password);
    return res.status(user.status).json(user.message);
};

module.exports = { createUserController };