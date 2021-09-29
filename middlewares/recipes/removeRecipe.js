const recipesServices = require('../../services/recipesServices');

const removeRecipe = async (req, res) => {
  const { id } = req.params;
  const { userInfo } = req;
  await recipesServices.remove(id, userInfo);
  return res.status(204).json();
};

module.exports = { removeRecipe };
