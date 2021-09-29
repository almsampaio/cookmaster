const loginModels = require('../models/login');

const userLogin = async (req, res) => {
    const { email } = req.body;
    const { token } = await loginModels.userLogin(email);
    return res.status(200).json({ token });
};

module.exports = { userLogin };