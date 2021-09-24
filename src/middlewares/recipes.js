const schema = require('../schema');
const { verify } = require('../auth/jwtFunctions');

const checkFieldName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.messages.invalidEntries });
  }
  next();
};

const checkFieldIngredients = (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.messages.invalidEntries });
  }
  next();
};

const checkFieldPreparation = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.messages.invalidEntries });
  }
  next();
};

const checkToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    verify(authorization);
  } catch (e) {
    if (e) {
      return res
      .status(schema.status.unauthorized)
      .json({ message: schema.messages.jwtMalformed });
    }
  }
  next();
};

module.exports = {
  checkFieldName,
  checkFieldIngredients,
  checkFieldPreparation,
  checkToken,
};
