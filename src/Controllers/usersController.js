const usersModel = require('../Models/usersModel');
const { HTTP_CREATED_STATUS } = require('../helpers');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersModel.createUser(name, email, password);
 return res.status(HTTP_CREATED_STATUS).json({ user });
};

module.exports = {
  create,
};
