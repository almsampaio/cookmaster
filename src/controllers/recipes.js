const {
  createRecipe,
  findAllRecipes,
  findRecipeById,
  update,
  removeRecipe,
  // addImageRecipe,
} = require('../services/recipes');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { status, data, message } = await createRecipe(name, ingredients, preparation, userId);
  if (message) return res.status(status).json({ message });
  res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await findAllRecipes();
  res.status(status).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await findRecipeById(id);
  if (message) return res.status(status).json({ message });
  res.status(status).json(data);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, preparation, ingredients } = req.body;
  const dataRecipe = { name, preparation, ingredients };
  // const { _id: userId } = req.user;
  const { status, data, message } = await update(id, dataRecipe);
  if (message) return res.status(status).json({ message });
  res.status(status).json(data);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await removeRecipe(id);
  if (message) return res.status(status).json({ message });
  res.status(status).send();
};

// const addImage = async (req, res) => {
//   const { id } = req.params;
//   const { image } = req.file;
//   const { status, data, message } = await addImageRecipe(id, image);
//   if (message) return res.status(status).json({ message });

//   res.status(status).json(data);
// };

module.exports = {
  create,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  // addImage,
};
