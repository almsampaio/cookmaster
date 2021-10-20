const RecipeModel = require('../models/Recipes');

const Errors = {
  doesntMatch: {
    isValid: false,
    status: 401,
    json: {
      message: 'Incorrect username or password',
    },
  },
  fieldsIncomplete: {
    isValid: false,
    status: 401,
    json: {
      message: 'All fields must be filled',
    },
  },
  invalidEntries: {
    isValid: false,
    status: 400,
    json: {
      message: 'Invalid entries. Try again.',
    },
  },
  invalidToken: {
    isValid: false,
    status: 401,
    json: {
      message: 'jwt malformed',
    },    
  },
};

const isFieldValid = (field) => {
  if (!field || typeof field !== 'string') {
    return Errors.invalidEntries;
  }

  return {
    isValid: true,
  };
};

const isValid = (name, ingredients, preparation, userId) => {
  const isNameValidObj = isFieldValid(name);
  if (!isNameValidObj.isValid) return isNameValidObj;
  const isIngredientsValidObj = isFieldValid(ingredients);
  if (!isIngredientsValidObj.isValid) return isIngredientsValidObj;
  const isPreparationValidObj = isFieldValid(preparation);
  if (!isPreparationValidObj.isValid) return isPreparationValidObj;
  
  if (!userId) {
    return Errors.invalidToken;
  }

  return {
    isValid: true,
  };
};

const create = async ({ name, ingredients, preparation, userId }) => {
  const isValidObj = isValid(name, ingredients, preparation, userId);
  if (!isValidObj.isValid) {
    return isValidObj;
  }

  const recipe = await RecipeModel.create({ name, ingredients, preparation, userId });

  return {
    status: 201,
    json: recipe,
  };
};

module.exports = {
  create,
  isValid,
};
