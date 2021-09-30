// const services = require('../services/recipesServices');
const model = require('../models/recipesModel');

const getAll = async (_req, res) => {
  const allRecipes = await model.getAll();
  return res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await model.getById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  return res.status(200).json(recipe);
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user; // como envei o user inteiro, pego apenas o _id e dou outro nome
  console.log(userId);
  
  const createRecepie = await model.createRecepie(name, ingredients, preparation, userId);
  console.log(createRecepie);

  return res.status(201).json({});
};

const update = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;

  const recipe = await model.update(id, req.body, role, userId);
  if (recipe === null) {
    return res.status(404).json({ message: 'recipe not found' });
  } 

  if (recipe === false) {
    return res.status(401).json({ message: 'missing auth token' });
  } 

  return res.status(200).json(recipe);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};