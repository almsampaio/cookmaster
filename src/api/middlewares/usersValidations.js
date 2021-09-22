const { BAD_REQUEST, CONFLICT, UNAUTHORIZED } = require('../utils/status');
const { getByEmail } = require('../services/usersServices');

const textsMessages = {
  badReq: { message: 'Invalid entries. Try again.' },
  conflict: { message: 'Email already registered' },
  beFilled: { message: 'All fields must be filled' },
  incorrect: { message: 'Incorrect username or password' },
};

const REGEX_EMAIL = /\S+@\S+\.\S+/;

const usersVAlidations = (req, res, next) => {
  const { email, name, password } = req.body;
  const emailValidate = REGEX_EMAIL.test(email);
  if (!email || !emailValidate || !name || !password) {
    return res.status(BAD_REQUEST).json(textsMessages.badReq);
  }
  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const testEmail = await getByEmail(email);
  if (testEmail) {
    return res.status(CONFLICT).json(textsMessages.conflict);
  }
  next();
};

const loginValitation = async (req, res, next) => {
  const { email, password } = req.body;
  const emailValidate = REGEX_EMAIL.test(email);
  if (!email || !emailValidate || !password) {
    return res.status(UNAUTHORIZED).json(textsMessages.beFilled);
  }
  next();
};

const checkUser = async (req, res, next) => {
  const testEmail = await getByEmail(req.body.email);
  if (!testEmail || testEmail.password !== req.body.password) {
    return res.status(UNAUTHORIZED).json(textsMessages.incorrect);
  }
  next();
};

module.exports = { usersVAlidations, emailExists, loginValitation, checkUser };
