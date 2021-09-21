const usersServices = require('../Services/usersServices');

const HTTP_STATUS_CREATED = 201;

const addUsers = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await usersServices.addUsers(name, email, password);
  if (!user.user) {
    const [codeErr, message] = user;
    const { code } = codeErr;
    return res.status(code).json(message);
  }

  return res.status(HTTP_STATUS_CREATED).json(user);
};

module.exports = {
  addUsers,
};