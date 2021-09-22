const auth = require('./auth');

const validateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateIfUserIsAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) return auth(req, res, next);
  next();
};

module.exports = {
  validateRecipe,
  validateIfUserIsAuth,
};
