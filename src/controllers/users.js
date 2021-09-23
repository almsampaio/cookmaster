const users = require('../services/users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  const { status, data, message } = await users.createUser(name, email, password, role);

  if (message) return res.status(status).json({ message });

  res.status(status).json({ user: data });
};

// const createToken = async (req, res) => {
//   const { email, password } = req.body;
//   const { status, token, err } = await users.createToken(email, password);
//   if (err) return res.status(status).json(err);

//   res.status(status).json({ token });
// };

module.exports = {
  createUser,
  // createToken,
};
