const UserService = require('../services/UserService');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const userCreated = await UserService.create({ name, email, password });

  if (userCreated.message) {
 return res.status(userCreated.code)
  .json({ message: userCreated.message }); 
}

  res.status(201).json(userCreated);
};

module.exports = {
  create,
};