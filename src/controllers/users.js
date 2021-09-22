const rescue = require('express-rescue');
const UsersServices = require('../services/users');

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const result = await UsersServices.create(name, email, password);
  if (result.message) return res.status(result.code).json({ message: result.message });
  res.status(201).json(result);
});

// const getByEmail = rescue(async (req, res) => {
//   const { email, password } = req.body;

//   const result = await UsersServices.getByEmail(email);
//   if (!result) res.status(404).json({ message: 'not found' });
//   res.status(200).json({ email, password });
// });

module.exports = {
  create,
  // getByEmail,
};
