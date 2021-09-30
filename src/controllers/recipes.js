const { Recipes } = require('../services');
const { SUCCESS_CREATED } = require('../utils/statusCodes');

const create = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  Recipes.create(name, ingredients, preparation, userId)
    .then((result) => res.status(SUCCESS_CREATED).json(result))
    .catch((err) => next(err));
};

module.exports = {
  create,
};