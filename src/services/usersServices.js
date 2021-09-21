const jwt = require('jsonwebtoken');
const models = require('../models/usersModel');
const util = require('../util/validations');
const httpStatus = require('../util/statusHttp');
const errorMsg = require('../util/errorMsg');

const SECRET = 'MinhaGrandeFraseDeSegurança';

const getToken = async (user) => {
  const token = jwt.sign(user, SECRET);
  return token;
};

const getAll = async () => {
  const result = await models.getAll();
  return result;
};

const create = async (user) => {
  const validatedName = util.checkName(user.name);
  if (validatedName) return validatedName;
  const validatedEmail = await util.checkEmail(user.email);
  if (validatedEmail) return validatedEmail;
  const userWithRole = { ...user, role: 'user' };
  const { name, email, role, _id } = await models.create(userWithRole);
  return { user: { name, email, role, _id } };
};

const findUser = async (user) => {
  const validatedBody = util.checkBody(user);
  if (validatedBody) return validatedBody;
  const [result] = await models.findByEmail(user.email);
  if (!result || result.email !== user.email || result.password !== user.password) {
    return { status: httpStatus.UNAUTHORIZED, msg: errorMsg.invalidData };
  }
  const userToken = await getToken(user);
  return { token: userToken }; 
};

module.exports = {
  getAll,
  create,
  findUser,
};
