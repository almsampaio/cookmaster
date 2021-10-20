const jwtVerify = require('./jwtFunctions');
const modelLogin = require('../models/login');

const err = {
  jwtMalformed: 'jwt malformed',
};

const validToken = async (token) => {
  try {
    const checkToken = jwtVerify.verify(token);
    const user = await modelLogin.searchEmailUser(checkToken.email);
    if (!user) return { message: err.jwtMalformed };
    const { _id } = user;
    return { id: _id };
  } catch (e) {
    return { message: e.message };
  }
};

const jwtAdminVerify = async (req, res, next) => {
  const { authorization: token } = req.headers;

  try {
    const checkToken = jwtVerify.verify(token);
    const user = await modelLogin.searchEmailUser(checkToken.email);
    
    const { role } = user;
    if (role !== 'admin') throw new Error();

    next();
  } catch (e) {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
};

module.exports = {
  validToken,
  jwtAdminVerify,
};
