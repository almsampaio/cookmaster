const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) next({ status: 401, message: 'missing auth token' });
  
    const { data } = jwt.verify(authorization, 'senhasecreta');
    
    req.auth = { ...data };

    next();
  } catch (error) {
    next({ status: 401, message: 'jwt malformed' });
  }
};