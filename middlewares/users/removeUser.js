const usersServices = require('../../services/usersServices');

const removeUser = async (req, res) => {
  const { id } = req.params;
  const deletedRecipe = await usersServices.remove(id);
  console.log(deletedRecipe.value);
  return res.status(200).json(deletedRecipe.value);
};

module.exports = { removeUser };
