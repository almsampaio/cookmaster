const recepiesModels = require('../models/recepiesModels');

const createRecepie = async (name, ingredients, preparation, userID) => {
  const create = await recepiesModels.createRecepie(name, ingredients, preparation, userID);

  return create;
};

module.exports = {
  createRecepie,
};