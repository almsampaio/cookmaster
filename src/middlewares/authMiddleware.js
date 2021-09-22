const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');
const httpStatus = require('../util/statusHttp');
const errorMsg = require('../util/errorMsg');

const SECRET = 'MinhaGrandeFraseDeSegurança';

const authToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(httpStatus.UNAUTHORIZED).json(errorMsg.noToken);
  try {
    const payload = jwt.verify(token, SECRET);
    const [result] = await userModel.findByEmail(payload.email);
    if (!result) return res.status(httpStatus.UNAUTHORIZED).json(errorMsg.badJwt);
    req.user = result;
    next();
  } catch (e) {
    return res.status(httpStatus.UNAUTHORIZED).json(errorMsg.badJwt);
  }
};

module.exports = {
  authToken,
};
