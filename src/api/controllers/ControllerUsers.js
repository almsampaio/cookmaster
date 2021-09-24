const ServiceUsers = require('../services/ServiceUsers');

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

module.exports = {
  create,
};
