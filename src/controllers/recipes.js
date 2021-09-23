// const {
//   createRecipe,
//   findAllRecipes,
//   findRecipeById,
//   update,
//   removeRecipe,
// } = require('../services/recipes');

// const create = async (req, res) => {
//   const { name, ingredients, preparation } = req.body;
//   const { _id } = req.user;
//   const { status, data, errObj } = await createRecipe(name, ingredients, preparation, _id);
//   if (errObj) return res.status(status).json(errObj);
//   res.status(status).json(data);
// };

// const getAll = async (_req, res) => {
//   const { status, data } = await findAllRecipes();
//   res.status(status).json(data);
// };

// const findById = async (req, res) => {
//   const { id } = req.params;
//   const { status, data, errObj } = await findRecipeById(id);
//   if (errObj) return res.status(status).json(errObj);
//   res.status(status).json(data);
// };

// const updateRecipe = async (req, res) => {
//   const { id } = req.params;
//   const { _id } = req.user;
//   const { status, data, errObj } = await update(id, req.body, _id);
//   if (errObj) return res.status(status).json(errObj);
//   res.status(status).json(data);
// };

// const deleteRecipe = async (req, res) => {
//   const { id } = req.params;
//   const { status, errObj } = await removeRecipe(id);
//   if (errObj) return res.status(status).json(errObj);
//   res.status(status).send();
// };

// module.exports = {
//   create,
//   getAll,
//   findById,
//   updateRecipe,
//   deleteRecipe,
// };
