const { INTERNAL_SERVER_ERROR } = require('../utils/statusCodes');

module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
};
