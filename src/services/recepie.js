const recipieModel = require('../models/recepie');

async function createRecepie(name, ingredients, preparation, userId) {
  const data = await recipieModel.createRecepie(name, ingredients, preparation, userId);
  return data;
}

async function editRecepie(id, name, ingredients, preparation) {
  const editedRecepie = await recipieModel.editRecepie(id, name, ingredients, preparation);
  return editedRecepie;
}

async function deleteOneRecepie(id) {
  const recepie = await recipieModel.deleteOneRecepie(id);
  return recepie;
}

module.exports = {
  createRecepie,
  editRecepie,
  deleteOneRecepie,
};
