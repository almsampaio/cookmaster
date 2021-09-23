const userService = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const result = await userService.createUser(email, password, name, role);
    if (result.status === 201) return res.status(result.status).json({ user: result.message }); 
    return res.status(result.status).json({ message: result.message });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  createUser,
};
