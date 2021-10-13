const jwt = require('jsonwebtoken');

const usersModel = require('../Model/userModel');

const SECRET = 'C3t$x7k4!YocfE$e';

const create = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const user2 = jwt.verify(token, SECRET);
    // console.log(user2);
    const user = await usersModel.verifyEmail(user2.email);    
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    req.user = user2;

    // role por aqui
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  create,
};

// ef: https://github.com/tryber/sd-010-a-cookmaster/pull/25/commits/32ea32e61d41b932dc94abe3003db39d5ceb874e