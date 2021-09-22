const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
  
    const { data } = jwt.verify(authorization, 'senhasecreta');
    
    req.body = { ...req.body, ...data };

    next();
  } catch (error) {
    next({ status: 401, message: 'jwt malformed' });
  }
};