const jwt = require('jsonwebtoken');
const userService = require('../service/userService');

const secret = 'seusecretdetoken';

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const verifyReq = (name, password, email) => {
  let invalidEntries = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = emailRegex.test(email);

  if (!name || !password || !email) {
    invalidEntries = true;
  }

  if (!validateEmail) {
    invalidEntries = true;
  }

  return invalidEntries;
};

const postUser = async (req, res) => {
  const { name, password, email } = req.body;
  const invalidEntries = verifyReq(name, password, email);
  const newUser = await userService.postUser(name, password, email);

  if (invalidEntries) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  } 

  if (newUser.message) {
    return res.status(409).json(newUser);
  }

  return res.status(201).json(newUser);
};

const verifyLogin = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const verifyEmail = emailRegex.test(email);

  if (!email || !password) {
    return { message: 'All fields must be filled' };
  }

  if (!verifyEmail) {
    return { message: 'Incorrect username or password' };
  }

  return null;
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const validLogin = await userService.postLogin(email, password);
  const invalidEntries = verifyLogin(email, password);

  const { role, _id } = validLogin;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ data: { _id, email, role } }, secret, jwtConfig);

  if (invalidEntries) {
    return res.status(401).json(invalidEntries);
  }

  if (validLogin.message) {
    return res.status(401).json(validLogin);
  }

  return res.status(200).json({ token });
};

module.exports = { postUser, postLogin };
