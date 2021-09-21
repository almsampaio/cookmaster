const { userRegisterModel } = require('./usersModel');

async function userRegisterService() {
  const teste = await userRegisterModel();
  return teste;
}

module.exports = {
  userRegisterService,
};
