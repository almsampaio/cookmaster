const jwt = require('jsonwebtoken');
const modelUsers = require('../models/users');

const SECRET = 'mypassword';

const loginUser = async (_email, _password) => {
  const searchUser = await modelUsers.getAll();
  const { password: _, ...userPayload } = searchUser;
  const token = jwt.sign(
    userPayload,
    SECRET,
  );
  return { status: 200, data: { token } }
};

module.exports = {
  loginUser,
};
