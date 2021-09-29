const jwt = require('jsonwebtoken');

// const userModel = require('../models/userModel');

const SECRET = 'meusupersegredo';

function newToken(user) {
  const { passaword: _, ...playload } = user;
  const jwtConfig = { 
    algorithm: 'HS256',
    expiresIn: '1d', }
};

const token = jwt.sign(payload, SECRET, jwtConfig);

return { token };
}

module.exports = { newToken };

/* module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { username } = jwt.verify(token, SECRET);

    const user = await userModel.findByUsername(username)

    req.user = user;

    next();
  } catch (_e) {
    res.status(401).json({ message: 'Invalid Token'});
  } */

};
