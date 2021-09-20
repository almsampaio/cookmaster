const userService = require('../services/userService');

const registerUser = async (req, res) => {
    const result = await userService.registerUser;
    return result;
};

module.exports = {
    registerUser,
};
