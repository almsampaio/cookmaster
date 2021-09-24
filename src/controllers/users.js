const { Users } = require('../services');
const { SUCCESS_CREATED, SUCCESS_OK } = require('../utils/statusCodes');

const getAll = async (_req, res, next) => {
  try {
    console.log('user-controller');
    const users = await Users.getAll();
    res.status(SUCCESS_OK).json(users);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const newError = new Error(error.message);
      newError.code = 'file_not_found';
      newError.status = 404;
      return next(newError);
    }
    next(error);
  }
};

const create = (req, res, next) => {
  const { name, email, password, role } = req.body;
  Users.create(name, email, password, role)
    .then((result) => res.status(SUCCESS_CREATED).json(result))
    .catch((err) => next(err));
};

module.exports = {
  getAll,
  create,
};