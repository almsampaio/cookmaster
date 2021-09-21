const userService = require('../service/userService');

module.exports = {
  async create(req, res) {
    const { name, email, password, role } = req.body;

    const newUser = await userService.create(name, email, password, role);

    return res.status(201).json({ user: newUser });
  },

  async login(req, res) {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    if (token) {
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Incorrect username or password' });
  },
};