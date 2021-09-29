const recipieModels = require('../models/recipe');

const addRecipies = async (name, ingredients, preparation, userId) => {
    const data = recipieModels.addRecipies(name, ingredients, preparation, userId);
    return data;
};

module.exports = { addRecipies };
