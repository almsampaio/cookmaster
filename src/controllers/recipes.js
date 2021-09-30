const { Recipes } = require('../services');
const { SUCCESS_CREATED, SUCCESS_OK, SUCCESS_NO_CONTENT } = require('../utils/statusCodes');

const create = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  Recipes.create(name, ingredients, preparation, userId)
    .then((result) => res.status(SUCCESS_CREATED).json(result))
    .catch((err) => next(err));
};

const getAll = (_req, res, next) => {
  Recipes.getAll()
    .then((result) => res.status(SUCCESS_OK).json(result))
    .catch((err) => next(err));
};

const getById = (req, res, next) => {
  const { id } = req.params; 
  Recipes.getById(id)
    .then((result) => res.status(SUCCESS_OK).json(result))
    .catch((err) => next(err));
};

const update = (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { userId, role } = req;
  Recipes.update({ id, name, ingredients, preparation, userId, role })
    .then(() => res.status(SUCCESS_OK).json({ _id: id, name, ingredients, preparation, userId }))
    .catch((err) => next(err));
};

const exclude = (req, res, next) => {
 const { id } = req.params;
 const { userId, role } = req;
 Recipes.exclude(id, userId, role)
  .then(() => res.status(SUCCESS_NO_CONTENT).json())
  .catch((err) => next(err));
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};