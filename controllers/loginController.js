const userServices = require('../services/userServices');
const generateToken = require('../src/api/token/generateToken');
const httpStatus = require('../utils/httpStatus');

const userLogin = (req, res) => {
  const { email } = req.body;

  const getUserInfo = userServices.findUserByEmail(email);
  const token = generateToken(getUserInfo);
  return res.status(httpStatus.HTTP_OK_STATUS).json({ token });
};

module.exports = userLogin;