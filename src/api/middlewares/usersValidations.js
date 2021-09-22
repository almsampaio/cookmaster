const { BAD_REQUEST, CONFLICT } = require('../utils/status');
const { getByEmail } = require('../model/usersModel');

const textsMessages = {
  badReq: { message: 'Invalid entries. Try again.' },
  conflict: { message: 'Email already registered' },
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

module.exports = { usersVAlidations, emailExists };
