const serviceRecipes = require('../services/recipes');

// req 4
const getAll = async (_req, res) => {
    const result = await serviceRecipes.getAll();
    res.status(200).json(result);
};

// req 5
const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await serviceRecipes.getById(id);
  res.status(status).json(data);
};

const createRecipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { status, data } = await serviceRecipes.createRecipe(name, ingredients, preparation);
    res.status(status).json(data);
};

/* const update = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const result = await serviceRecipes.update(name, ingredients, preparation);
    res.status(200).json(result);
}; */

module.exports = {
    createRecipes,
    getAll,
    getById,
    // update,
};
