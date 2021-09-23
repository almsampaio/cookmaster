const { middlewaresUsers } = require('../middlewares');

const registerProducts = [
  middlewaresUsers.checkEmailUser,
  middlewaresUsers.checkNameUser,
  middlewaresUsers.checkPasswordUser,
];

module.exports = { registerProducts };
