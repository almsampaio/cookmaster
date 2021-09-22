const {
    updateById,
    takeToken,
} = require('../services');

const updateRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;
    const newRecipe = { name, ingredients, preparation };
    const updateResponse = await updateById('recipes', id, newRecipe);
    const payload = takeToken(authorization);
    const stringId = '_id';
    newRecipe.userId = payload.data[stringId];    
    if (updateResponse) return res.status(200).json({ ...newRecipe, _id: id });
};

module.exports = updateRecipe;
