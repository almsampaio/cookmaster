const { recipesModels } = require('../models');
const auth = require('../auth/jwtFunctions');

const create = async (token, name, ingredients, preparation) => {
  const checkToken = auth.verify(token);
  // console.log(checkToken._id); // queria fazer assim, mas o esLint não deixa :(
  const getIdUser = Object.values(checkToken)[0]; // gambiarra para trazer apenas o id do user
  const recipe = await recipesModels.create(getIdUser, name, ingredients, preparation);
  return recipe;
};

module.exports = { create };
