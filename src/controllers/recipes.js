const serviceRecipes = require('../services/recipes');

const createRecipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { status, data } = await serviceRecipes.createRecipe(name, ingredients, preparation);
    res.status(status).json(data);
};

module.exports = {
    createRecipes,
};