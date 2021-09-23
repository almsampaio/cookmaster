const { ObjectId } = require('mongodb');
const { recipesSchema } = require('../helpers/validation.schema');
const {
  create,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
} = require('../models/recipes');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT_STATUS = 204;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { error } = recipesSchema.validate(name, ingredients, preparation);
  if (error) {
 return {
    status: BAD_REQUEST_STATUS,
    errObj: { message: 'Invalid entries. Try again.' },
  }; 
}

  const recipe = await create(name, ingredients, preparation, userId);
  return { status: CREATED_STATUS, data: { recipe } };
};

const findAllRecipes = async () => {
  const recipes = await getAll();
  return { status: OK_STATUS, data: recipes };
};

const findRecipeById = async (id) => {
  const findRecipe = ObjectId.isValid(id);
  if (!findRecipe) {
 return {
    status: NOT_FOUND_STATUS,
    errObj: { message: 'recipe not found' },
  }; 
}

  const recipe = await findById(id);

  return { status: OK_STATUS, data: recipe };
};

const update = async (id, data, userId) => {
  const findRecipe = ObjectId.isValid(id);
  if (!findRecipe) {
 return {
    status: NOT_FOUND_STATUS,
    errObj: { message: 'recipe not found' },
  }; 
}

  const recipe = await updateRecipe(id, data, userId);
  return { status: OK_STATUS, data: recipe };
};

const removeRecipe = async (id) => {
  const findRecipe = ObjectId.isValid(id);
  if (!findRecipe) {
 return {
    status: NOT_FOUND_STATUS,
    errObj: { message: 'recipe not found' },
  }; 
}

  await deleteRecipe(id);
  return { status: NO_CONTENT_STATUS };
};

module.exports = {
  createRecipe,
  findAllRecipes,
  findRecipeById,
  update,
  removeRecipe,
};
