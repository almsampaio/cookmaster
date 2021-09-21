const {
    getById,
} = require('../services');

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const recipe = await getById('recipes', id);
    if (!recipe) return res.status(404).json({ message: 'recipe not found' });
    return res.status(200).json(recipe);
};

module.exports = getRecipeById;