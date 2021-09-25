const { ok } = require('../../utils/httpStatus');

const loginController = (request, response) => {
  const { token } = request;

  response.status(ok).json({ token });
};

module.exports = loginController;
