const recipeService = require('../services/recipeService');

const getRecipes = async (req, res) => {
    const result = await recipeService.getRecipes();
    // if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(200).send(result);
};

module.exports = {
    getRecipes,
};
