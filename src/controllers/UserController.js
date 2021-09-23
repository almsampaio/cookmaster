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

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { user: { role } } = req;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' }); 
  }

  const userCreated = await UserService.createAdmin({ name, email, password });

  if (userCreated.message) {
    return res.status(userCreated.code)
      .json({ message: userCreated.message });
  }

  res.status(201).json(userCreated);
};

module.exports = {
  create,
  createAdmin,
};