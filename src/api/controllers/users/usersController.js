const {
  HTTP_CONFLICT,
  HTTP_CREATED,
} = require('../../schemas/status');

const {
  createServices,
} = require('../../services/users/usersService');

const createController = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  const { message, data } = await createServices(name, email, password, role);

  if (!data) {
    return res.status(HTTP_CONFLICT).json({
      message,
    });
  }

  return res.status(HTTP_CREATED).json({
    user: data,
  });
};

module.exports = {
  createController,
};