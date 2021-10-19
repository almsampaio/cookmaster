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

const update = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const { status, data } = await serviceRecipes
    .update({ id, name, ingredients, preparation, userId });
    res.status(status).json(data);
}; 

const remove = async (req, res) => {
    const { id } = req.params;
    const result = await serviceRecipes.remove(id);
    if (result) return res.status(result.status).json(result.msg);
    res.status(204).end();
};

module.exports = {
    createRecipes,
    getAll,
    getById,
    update,
    remove,
};
