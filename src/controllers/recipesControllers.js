// const services = require('../services/recipesServices');
const model = require('../models/recipesModel');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user; // como envei o user inteiro, pego apenas o _id e dou outro nome
  console.log(userId);
  
  const createRecepie = await model.createRecepie(name, ingredients, preparation, userId);
  console.log(createRecepie);

  return res.status(201).json(createRecepie);
};

module.exports = {
  create,
};