const { userRegisterModel } = require('./loginModel');

async function userRegisterService() {
  const teste = await userRegisterModel();
  return teste;
}

module.exports = {
  userRegisterService,
};
