const userService = require('../services/userService');

const HTTP_CREATED_STATUS = 201;

module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'admin';

  const response = await userService.insertUser(name, email, password, role);

  if (response.code) {
    return res.status(response.code).json({
        message: response.message,
    });
}

  return res.status(HTTP_CREATED_STATUS).json({ user: response });
};