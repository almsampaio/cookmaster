const recipieModel = require('../models/recepie');

async function createRecepie(name, ingredients, preparation, userId) {
  const data = await recipieModel.createRecepie(name, ingredients, preparation, userId);
  return data;
}

module.exports = { createRecepie };
