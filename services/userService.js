const userModel = require('../services/userModel');

const registerUser = async (req, res) => {
    const result = await userModel.registerUser;
    if (result.message) return res.status(result.status).send(result.message);
    return res.status(201).send(result);
};

module.exports = {
    registerUser,
};
