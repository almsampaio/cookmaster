const {
    takeToken,
} = require('../services');

const GENERAL_ERROR = {
    message: 'Invalid entries. Try again.',
};

const TOKEN_ERROR = {
    message: 'jwt malformed',
};

const validateRecipe = (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    if (!name || !ingredients || !preparation) return res.status(400).json(GENERAL_ERROR);
    const decoded = takeToken(token);
    if (!decoded) return res.status(401).json(TOKEN_ERROR);
    next();
};

module.exports = validateRecipe;