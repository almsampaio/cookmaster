const userService = require('../services/userService');

const register = async (req, res) => {
    const { name, email, password } = req.body;
  
    const { message, _id } = await userService.register(name, email, password);

    if (message === 'Email already registered') return res.status(409).json({ message });
  
    if (message) return res.status(400).json({ message });
    res.status(201).json({ user: { name, email, role: 'user', _id } });
  };

  module.exports = {
    register,
}; 