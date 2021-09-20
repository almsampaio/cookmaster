const userService = require('../services/userService');

const registerUser = async (req, res) => {
    const result = await userService.registerUser;
    if (result.message) return res.status(result.status).send(result.message);
    return res.status(201).send(result);
};

module.exports = {
    registerUser,
};
