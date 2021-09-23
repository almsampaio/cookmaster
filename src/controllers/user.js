const { services } = require('../services');
const schema = require('../schema');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const registerUser = await services.create(name, email, password);
  return res.status(schema.status.created).json(registerUser);
};

module.exports = create;
