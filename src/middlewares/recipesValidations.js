const { StatusCodes } = require('http-status-codes');

const validateEntries = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  validateEntries,
};