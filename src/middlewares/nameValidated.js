const isValidName = require('./validations/isValidName');

const nameValidated = (req, res, next) => {
  const { name } = req.body;
  const response = isValidName(name);
  if (response) return res.status(response.status).json({ message: response.message });
  next();
};

module.exports = nameValidated;