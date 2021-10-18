const {
    createModel,
    readAllModel,
    readByIdModel,
    updateModel,
    updateImageModel,
    deleteModel,
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
  
  const updateImageServices = async (idRecipes, image, userId, role) => {
    const foundData = await readByIdModel(idRecipes);
  
    if (!foundData) {
      return { isEmpty: true };
    }
  
    if (role === 'admin' || userId === foundData.userId) {
      await updateImageModel(idRecipes, image);
      const data = await readByIdModel(idRecipes);
      return { data };
    }
  
    return { message: 'this recipe is not yours', notEqual: true };
  };
  
  const deleteServices = async (id, userId, role) => {
    const foundData = await readByIdModel(id);
  
    if (!foundData) {
      return { isEmpty: true };
    }
  
    if (role === 'admin' || userId === foundData.userId) {
      await deleteModel(id);
      return { deleted: true };
    }
  
    return { message: 'this recipe is not yours', notEqual: true };
  };
  
  module.exports = {
    createServices,
    readAllServices,
    readByIdServices,
    updateServices,
    updateImageServices,
    deleteServices,
  };