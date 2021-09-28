const rescue = require('express-rescue');
const userService = require('../services/userService');

const createUser = rescue(async (req, res, next) => {
    const { name, email, password } = req.body;
    const createdUser = await userService.userCreateService(name, email, password);
    if (!createdUser.message) {
        return res.status(201).json(createdUser);
    }
    return next(createdUser);
});

const loginController = rescue(async (req, res, next) => {
    const token = await userService.userLoginService(req);

    if (!token.message) return res.status(200).json({ ...token });

    return next(token);
});

module.exports = {
    createUser,
    loginController,
};