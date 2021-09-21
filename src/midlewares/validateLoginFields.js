const {
    getUser,
} = require('../models');

const ERROR_MESSAGE_EMPTY = {
    message: 'All fields must be filled',
};

const INVALID_USER = {
    message: 'Incorrect username or password',
};

const validateLoginFields = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json(ERROR_MESSAGE_EMPTY);
    const validationArr = await getUser('users', { email, password });
    if (validationArr.length === 0) return res.status(401).json(INVALID_USER);
    next();
};

module.exports = validateLoginFields;