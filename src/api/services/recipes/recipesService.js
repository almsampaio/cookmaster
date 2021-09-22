const {
  createModel,
  readAllModel,
  readByIdModel,
  updateModel,
} = require('../../models/recipes/recipesModel');

const createServices = async (name, ingredients, preparation, userId) => {
  const data = await createModel(name, ingredients, preparation, userId);

  return { data };
};

const readAllServices = async () => {
  const data = await readAllModel();

  return { data };
};

const readByIdServices = async (id) => {
  const data = await readByIdModel(id);

  if (!data) {
    return { message: 'recipe not found' };
  }

  return { data };
};

const updateServices = async (idRecipes, userId, role, updatedData) => {
  const foundData = await readByIdModel(idRecipes);

  if (role === 'user' && userId !== foundData.userId) {
    return { message: 'this recipe is not yours' };
  }
  
  await updateModel(updatedData);

  const data = await readByIdModel(idRecipes);
  
  return { data };
};

module.exports = {
  createServices,
  readAllServices,
  readByIdServices,
  updateServices,
};