const jwt = require('jsonwebtoken');
const { schemaCreateRecipe } = require('../validations/validations');

const secret = 'seusecretdetoken';

const validationCreateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const validate = schemaCreateRecipe.validate({ name, ingredients, preparation });
  if (validate.error) {
  return res.status(400)
  .json({ message: 'Invalid entries. Try again.' });
}
  next();
};

const validationtoken = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const validToken = jwt.verify(authorization, secret);
    req.user = validToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validationCreateRecipe,
  validationtoken,
};
