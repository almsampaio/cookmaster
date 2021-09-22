const { deleteById } = require('../services');

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    await deleteById('recipes', id);
    return res.status(204).end();
};

module.exports = deleteRecipe;