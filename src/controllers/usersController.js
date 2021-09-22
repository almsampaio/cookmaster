const rescue = require('express-rescue');
const usersService = require('../services/usersService');

const create = rescue(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await usersService.create(name, email, password);
console.log(user);
    if (user.message) {
        if (user.message === 'Email already registered') {
            return res.status(409).json(user);
        }
        return res.status(400).json(user);
    }

    res.status(201).json(user);
});

module.exports = {
    create,
};