const { ObjectId } = require('mongodb');
const recipesServices = require('../../services/recipesServices');
const recipesErrors = require('./recipesErrors');

const { notFound } = recipesErrors;

const getRecipeById = async (req, res, _next) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!ObjectId.isValid(id)) throw new Error(notFound.message);
    const recipe = await recipesServices.getById(id);
    if (!recipe || recipe === null) throw new Error(notFound.message);
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(notFound.code).json({ message: error.message });
  }
};

module.exports = { getRecipeById };
