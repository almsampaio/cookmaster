const recepiesService = require('../services/recepiesService');

const createRecepie = async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const userID = request.user;
  const create = await recepiesService.createRecepie(name, ingredients, preparation, userID);
  
  return response.status(201).json(create);
};

module.exports = {
  createRecepie,
};
