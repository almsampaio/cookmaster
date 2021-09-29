const { Users } = require('../services');
const { SUCCESS_CREATED, SUCCESS_OK } = require('../utils/statusCodes');

const create = (req, res, next) => {
  const { name, email, password, role } = req.body;
  Users.create(name, email, password, role)
    .then((result) => res.status(SUCCESS_CREATED).json(result))
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  Users.login(email, password)
    .then((result) => res.status(SUCCESS_OK).json(result))
    .catch((err) => next(err));
};

module.exports = {
  create,
  login,
};