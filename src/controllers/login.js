const loginModels = require('../models/login');

const userLogin = async (req, res) => {
    const { email } = req.body;
    const login = await loginModels.userLogin(email);
    return res.status(200).json({ token: login });
};

module.exports = { userLogin };