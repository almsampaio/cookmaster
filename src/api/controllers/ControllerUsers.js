const ServiceUsers = require('../services/ServiceUsers');

const SUCCESS = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const createdUser = await ServiceUsers.create({ name, email, password });

    return res.status(CREATED).json(createdUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await ServiceUsers.login({ email, password });

    return res.status(SUCCESS).json(token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  login,
};
