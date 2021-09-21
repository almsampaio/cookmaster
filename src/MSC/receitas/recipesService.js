const { userRegisterModel } = require('./recipesModel');

async function userRegisterService() {
  const teste = await userRegisterModel();
  return teste;
}

module.exports = {
  userRegisterService,
};
