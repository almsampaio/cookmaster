const { doesEmailExists, validateEmail } = require('../services');

const GENERAL_ERROR = {
    message: 'Invalid entries. Try again.',
};

const EMAIL_ERROR = {
    message: 'Email already registered',
};

const validateUser = async (req, res, next) => {
    const { email, name, password } = req.body;
    const isValid = await validateEmail(email);
    const doesExists = await doesEmailExists(email);
    const validateArr = [email, name, password]
    .filter((element) => element !== undefined);
    if (validateArr.length < 3 || !isValid) return res.status(400).json(GENERAL_ERROR);
    if (doesExists) return res.status(409).json(EMAIL_ERROR);
    next();
};

module.exports = validateUser;