const rescue = require('express-rescue');
const userService = require('../services/userService');

const createUser = rescue(async (req, res, next) => {
    const { name, email, password } = req.body;
    const createdUser = await userService.create(name, email, password);
    if (!createdUser.message) {
        return res.status(201).json(createdUser);
    }
    return next(createdUser);
});

module.exports = {
    createUser,
};