const { ObjectId } = require('mongodb');
const {
  create,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  // addImage,
} = require('../models/recipes');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT_STATUS = 204;
const NOT_FOUND_STATUS = 404;

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await create(name, ingredients, preparation, userId);
  return { status: CREATED_STATUS, data: { recipe } };
};

const findAllRecipes = async () => {
  const recipes = await getAll();
  return { status: OK_STATUS, data: recipes };
};

const findRecipeById = async (id) => {
  const findRecipe = await findById(id);
  if (!findRecipe) {
 return {
    status: NOT_FOUND_STATUS,
    message: 'recipe not found',
  }; 
}
  return { status: OK_STATUS, data: findRecipe };
};

const update = async (id, data) => {
  const findRecipe = await findById(id);
  if (!findRecipe) {
 return {
    status: NOT_FOUND_STATUS,
    message: 'recipe not found',
  }; 
}

  const recipe = await updateRecipe(id, data);
  return { status: OK_STATUS, data: recipe };
};

const removeRecipe = async (id) => {
  const findRecipe = ObjectId.isValid(id);
  if (!findRecipe) {
 return {
    status: NOT_FOUND_STATUS,
    message: 'recipe not found',
  }; 
}

  await deleteRecipe(id);
  return { status: NO_CONTENT_STATUS };
};

// const addImageRecipe = async (id, image) => {
//   const findImage = ObjectId.isValid(id);
//   if (!findImage) return { status: NOT_FOUND_STATUS, message: 'recipe not found' };

//   const imagePath = `localhost:3000/src/uploads/${image}`;
//   const newImage = await addImage(id, imagePath);

//   return { status: OK_STATUS, data: newImage };
// };

module.exports = {
  createRecipe,
  findAllRecipes,
  findRecipeById,
  update,
  removeRecipe,
  // addImageRecipe,
};
