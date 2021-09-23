const userServices = require('../services/userServices');
const generateToken = require('../src/api/token/generateToken');
const httpStatus = require('../utils/httpStatus');

const userLogin = async (req, res) => {
  const { email } = req.body;

  const getUserInfo = await userServices.findUserByEmail(email);
  // console.log('1--------', getUserInfo);
  const token = generateToken(getUserInfo);
  return res.status(httpStatus.HTTP_OK_STATUS).json({ token });
};

module.exports = userLogin;