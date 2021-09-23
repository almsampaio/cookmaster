const userService = require('../services/user-service');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userData = await userService.createUser(name, email, password);
    console.log(userData);
    if (userData.message) return res.status(userData.status).json({ message: userData.message });

    res.status(201).json({ user: userData });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createUser };
