const jwt = require('jsonwebtoken');
const errors = require('../errors');
const UserService = require('../services/UserService');

const SECRET = 'secretstring';

const getUser = async (email) => {
  const user = await UserService.findUserByEmail(email);

  if (!user) {
    throw new Error(errors.userNotFound);
  }
  return user;
};

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: errors.tokenNotFound });
  }

 try {
 const decoded = jwt.verify(authorization, SECRET);

  if (!decoded.data) {
    throw new Error(errors.invalidToken);
  }

  const user = await getUser(decoded.data.email);
  
  const { password: userPass, ...rest } = user;

  req.user = rest;
  next();
 } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
