// const services = require('../services/recipesServices');
const model = require('../models/recipesModel');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user;
  
  const createRecepie = await model.createRecepie(name, ingredients, preparation, userId);

  return res.status(201).json(createRecepie);
};

module.exports = {
  create,
};