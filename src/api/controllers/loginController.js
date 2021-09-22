const rescue = require('express-rescue');
const { StatusCodes: { UNAUTHORIZED, OK } } = require('http-status-codes');
const User = require('../services/loginService');
const createToken = require('../token/createToken');

module.exports = rescue(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) { 
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' }); 
  }

  const user = await User.login(email);

  if (!user || user.password !== password) { 
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' }); 
  }

  const token = createToken(user);

  res.status(OK).json({ token });
});