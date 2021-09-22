const userService = require('../services/userService');

const HTTP_OK_STATUS = 200;

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const response = await userService.findByCredentials(email, password);

  if (response.code) {
    return res.status(response.code).json({
        message: response.message,
    });
}

  return res.status(HTTP_OK_STATUS).json(response);
};