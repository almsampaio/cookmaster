const UserService = require('../Service/UsersService');

const userRegistration = async (req, res) => {
  try {
    const data = req.body;
    const response = await UserService.userRegistration(data);
    res.status(201).json(response);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const token = await UserService.login(data);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { userRegistration, login };