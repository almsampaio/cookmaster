const services = require('../servece/sersvusers');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, response } = await services.createUser(name, email, password);
  return res.status(status).json(response);
};

module.exports = {
  createUser,
};