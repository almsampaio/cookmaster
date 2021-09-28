const recepieService = require('../services/recepie');
const recepiesModel = require('../models/recepie');

async function createRecepie(req, res) {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user;
  const data = await recepieService.createRecepie(name, ingredients, preparation, userId);
  return res.status(201).json(data);
}

async function findRecepies(_req, res) {
  const recepies = await recepiesModel.findRecepies();
  return res.status(200).json(recepies);
}

async function findRecepieById(req, res) {
  const { id } = req.params;
  const recepie = await recepiesModel.findRecepieById(id);
  if (!recepie) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recepie);
}

module.exports = {
  createRecepie,
  findRecepies,
  findRecepieById,
};
