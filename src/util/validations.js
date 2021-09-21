const errorMsg = require('./errorMsg');
const httpStatus = require('./statusHttp');
const findEmail = require('../models/usersModel');

const checkName = (name) => {
  if (!name) {
    return { status: httpStatus.BAD_REQUEST, msg: errorMsg.invalidEntries };
  }
  return false;
};

const checkEmail = async (email) => {
  const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  const validEmail = regex.test(email);
  if (!email || !validEmail) {
    return { status: httpStatus.BAD_REQUEST, msg: errorMsg.invalidEntries };
  }
  const emailFound = await findEmail.findByEmail(email);
  if (emailFound.length > 0) {
    return { status: httpStatus.CONFLICT, msg: errorMsg.conflict };
  }
  return false;
};

const checkBody = (body) => {
  const { email, password } = body;
  if (!email || !password) {
    return { status: httpStatus.UNAUTHORIZED, msg: errorMsg.missingFields };
  }
  return false;
};

module.exports = {
  checkName,
  checkEmail,
  checkBody,
};
