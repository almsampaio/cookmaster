const userService = require('../services/userService');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = { name, email, password };
    const result = await userService.registerUser(user);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(201).json(result);
};

const checkLogin = async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.checkLogin(email, password);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(200).json({ token: result });
};

module.exports = {
    registerUser,
    checkLogin,
};
