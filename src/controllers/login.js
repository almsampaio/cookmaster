const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const validateEmail = require('../utils/emailValidator');

const secret = 'secret123';

const validateUserData = async (email, password) => {
  if (!validateEmail(email)) {
 return {
    code: 401,
    message: 'Incorrect username or password',
  }; 
}

  const user = await userModel.findUserByEmail(email);
  
  if (!user || user.password !== password) {
 return {
    code: 401,
    message: 'Incorrect username or password',
  }; 
}

  return { user };
};

module.exports = async (req, res) => {
  const { email = '', password = '' } = req.body;

  if (!password || !email) return res.status(401).json({ message: 'All fields must be filled' });

  const { code, message, user } = await validateUserData(email, password);

  if (message) return res.status(code).json({ message });

  const jwtconfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const { _id, role } = user;

  const formattedUser = { email: user.email, id: _id, role };

  const token = jwt.sign({ data: formattedUser }, secret, jwtconfig);
  return res.status(200).json({ token });
};
