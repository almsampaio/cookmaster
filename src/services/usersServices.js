const jwt = require('jsonwebtoken');
const modelsUsers = require('../models/usersModels');
const validUser = require('../schemas/validationsUsers');
const validLogin = require('../schemas/validationsLogin');

const SECRET = 'meusupersegredo';

const createdToken = async (email, password) => {
  const userSearch = await modelsUsers.findByEmail(email);

  // console.log(userSearch);

  const validEmail = validLogin.emailORequired(email);
  if (validEmail) return { status: 401, data: validEmail };

  const validPassword = validLogin.passwordRequired(password);
  if (validPassword) return { status: 401, data: validPassword };

  const isValidEmail = await validLogin.emailNotExists(email);
  if (isValidEmail) return { status: 401, data: isValidEmail };

  const { password: _, ...userPaylod } = userSearch;

  const token = jwt.sign(
    userPaylod,
    SECRET,
    // { algorithm: 'HS256', expiresIn: '15d15m' }
  );

  return { status: 200, data: { token } };
};

const created = async (name, email, password) => {
  const validName = validUser.nameObrigat(name);
  if (validName) return { status: 400, data: validName };

  const validPassword = validUser.passwordObrigat(password);
  if (validPassword) return { status: 400, data: validPassword };

  const validEmail = validUser.emailObrigat(email);
  if (validEmail) return { status: 400, data: validEmail };

  const existsEmail = await validUser.emailExists(email);
  if (existsEmail) return { status: 409, data: existsEmail };

  const [newUser] = await modelsUsers.created(name, email, password);

  const { password: _, ...user } = newUser;
  // const { _password, ...user } = newUser;

  return { status: 201, data: { user } };

  // return { status: 201, data: { user: { ...newUser } } };

  // return { status: 201, data: { user: {_id, name, email, role } } };
};

module.exports = {
  created,
  createdToken,
};