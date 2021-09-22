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

module.exports = { userRegistration };