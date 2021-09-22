const recipeModel = require('../models/recipeModel');
const userSchema = require('../schema/userSchema');

const findById = async (id) => {
 const idExists = userSchema.validateId(id);
  if (idExists === true) {
    const response = await recipeModel.getById(id);
    if (!response) return ({ code: 404, message: 'recipe not found' });
    return response;
  }
  return (idExists);
};

const insertRecipe = async (name, ingredients, preparation, userId) => {
    if (name === undefined || ingredients === undefined || preparation === undefined) { 
    return ({ code: 400, message: 'Invalid entries. Try again.' }); 
    }

  const data = await recipeModel.getAll();
  const alreadyExists = userSchema.findValueInArrayOfObjects(data, name, 'name');

  if (alreadyExists) return ({ code: 409, message: 'Recipe already exists' });

  const response = await recipeModel.create({ name, ingredients, preparation, userId });
  return response;
};

const updateById = async (id, user, { name, ingredients, preparation }) => {
  const idValid = userSchema.validateId(id);
  if (!idValid) return ({ code: true });
  const recipe = await recipeModel.getById(id);
  const receivedUserId = '_id';
  if (recipe.userId.toString() !== user[receivedUserId].toString() && user.role !== 'admin') {
    return ({ code: true });
  }

const data = await recipeModel.update(id, { name, ingredients, preparation });
if (data === 1) return findById(id);
return ({ code: true });
};

const deleteById = async (id, user) => {
  const idValid = userSchema.validateId(id);
  if (!idValid) return ({ code: true });
  const recipe = await recipeModel.getById(id);
  const receivedUserId = '_id';
  if (recipe.userId.toString() !== user[receivedUserId].toString() && user.role !== 'admin') {
    return ({ code: true });
  }

const data = await recipeModel.deleteById(id);
return (data);
};

const insertImage = async (id, user) => {
  console.log({ user, id });
//   const idValid = userSchema.validateId(id);
//   if (!idValid) return ({ code: true });
//   const recipe = await recipeModel.getById(id);
//   const receivedUserId = '_id';
//   if (recipe.userId.toString() !== user[receivedUserId].toString() && user.role !== 'admin') {
//     return ({ code: true });
//   }

// const data = await recipeModel.deleteById(id);
// return (data);
};

module.exports = {
  insertRecipe,
  findById,
  updateById,
  deleteById,
  insertImage,
};
