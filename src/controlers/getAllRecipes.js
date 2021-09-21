const { getAll } = require('../services');

const getAllRecipes = async (_req, res) => {
    const recipes = await getAll('recipes');
    return res.status(200).json(recipes);
};

module.exports = getAllRecipes;