const users = require('../services/usersService');

const CREATED = 201;

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

module.exports = {
  addUser,
};
