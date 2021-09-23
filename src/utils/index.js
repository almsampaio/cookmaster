const { middlewaresUsers } = require('../middlewares');

const registerUser = [
  middlewaresUsers.checkEmailCreate,
  middlewaresUsers.checkNameCreate,
  middlewaresUsers.checkPasswordCreate,
];

const loginUser = [
  middlewaresUsers.checkEmailLogin,
  middlewaresUsers.checkPasswordLogin,
];

module.exports = {
  registerUser,
  loginUser,
};
