const userModel = require('../models/usersModel');

const validateEmailAlreadyExists = async (req, res, next) => {
    const { email } = req.body;
    const userByEmail = await userModel.getUserByEmail(email);
    if (userByEmail) return res.status(409).json({ message: 'Email already registered' });
    next();
};

module.exports = {
    validateEmailAlreadyExists,
};
