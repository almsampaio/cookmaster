const jwt = require('jsonwebtoken');
const errors = require('../errors');
const UserService = require('../services/UserService');

const SECRET = 'secretstring';

const jwtConfig = {
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.findUserByEmail(email);

    if (!user || user.password !== password || user.email !== email) {
      return res.status(401).json({ message: errors.incorrectUser });
    }

    const { password: userPass, ...rest } = user;

    const token = jwt.sign({ data: rest }, SECRET, jwtConfig);

    res.status(200).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal error', error: err.message });
  }
};

module.exports = { login };
