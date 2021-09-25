const schema = require('../schema');
const { verify } = require('../auth/jwtFunctions');
const { recipesServices } = require('../services');

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
// a solução do try/catch foi uma dica do mestre corujão
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

const checkExistToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
    .status(schema.status.unauthorized)
    .json({ message: schema.messages.jwtNoFound });
  }
  next();
};

const checkExistRecipe = async (req, res, next) => {
  const { id } = req.params;
  const checkId = await recipesServices.getOne(id);
  if (!checkId) {
    return res
    .status(schema.status.notFound)
    .json({ message: schema.messages.recipeNotFound });
  }
  next(); 
};

module.exports = {
  checkFieldName,
  checkFieldIngredients,
  checkFieldPreparation,
  checkToken,
  checkExistRecipe,
  checkExistToken,
};
