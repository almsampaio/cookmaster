const users = require('../services/usersService');

const CREATED = 201;
const STATUS_OK = 200;

const addUser = async (req, res) => {
  const userInfo = req.body;
  // console.log(userInfo);
  const newUser = await users.addUser(userInfo);

  if (newUser.err) {
    return res
      .status(newUser.err.status)
      .json({ message: newUser.err.message });
  }

  return res.status(CREATED).json({ user: newUser });
};

const login = async (req, res) => {
  const userInfo = req.body;

  const token = await users.login(userInfo);

  if (token.err) {
    return res
      .status(token.err.status)
      .json({ message: token.err.message });
  }

  return res.status(STATUS_OK).json({ token });
};

module.exports = {
  addUser,
  login,
};
