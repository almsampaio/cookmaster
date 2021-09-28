const recipesModel = require('../models/recipesModel');

const existField = (name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) {
      return false;
    }
    return true;
};

const create = async ({ name, ingredients, preparation }) => {
    const existFields = existField(name, ingredients, preparation);
    if (!existFields) {
      return { message: 'Invalid entries. Try again.' }; 
    }
    const { id, _id } = await recipesModel.create({ name, ingredients, preparation });
    return { id, name, ingredients, preparation, _id };
};

module.exports = { create }; 