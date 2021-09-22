const usersServices = require('../Services/usersServices');

const INTERNAL_SERVER_ERROR = 500;

const addUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { code, message, user } = await usersServices.addUsers(name, email, password);

    return res.status(code).json({ message, ...user });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: 'Erro interno', error: err },
);
  }
};

module.exports = {
  addUsers,
};