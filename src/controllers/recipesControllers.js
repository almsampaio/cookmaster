const service = require('../services/recipesServices');
const model = require('../models/recipesModel');

const getAll = async (_req, res) => {
  const allRecipes = await model.getAll();
  return res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await model.getById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user; // como envei o user inteiro, pego apenas o _id e dou outro nome

  const createRecepie = await model.create(name, ingredients, preparation, userId);

  return res.status(201).json(createRecepie);
};

const update = async (req, res) => {
  const { id } = req.params; // id da receita

  const updateRecipe = await service.update(req.body, req.user, id);

  if (updateRecipe === null) return res.status(404).json({ message: 'recipe not found' });
  
  if (updateRecipe === false) return res.status(401).json({ message: 'missing auth token' });

  // if (updateRecipe.message) return res.status(409).json(updateRecipe);
  // se createUser tiver um atributo/Chave com o valor message, quer dizer que deu erro, então retornamos res.status de erro

  return res.status(200).json(updateRecipe);
};

const remove = async (req, res) => {
  const { id } = req.params; // id da receita

  const removeRecipe = await service.remove(req.user, id);

  if (removeRecipe === null) return res.status(404).json({ message: 'recipe not found' });
  
  if (removeRecipe === false) return res.status(401).json({ message: 'missing auth token' });

  // if (removeRecipe.message) return res.status(409).json(removeRecipe);

  return res.status(204).send();
};

const upload = async (req, res) => {
  const { id } = req.params; // id da receita
  const { path: img } = req.file; // pego a imagem

  const uploadImg = await service.remove(req.user, id, img);

  if (uploadImg === null) return res.status(404).json({ message: 'recipe not found' });
  
  if (uploadImg === false) return res.status(401).json({ message: 'missing auth token' });

  // if (uploadImg.message) return res.status(409).json(uploadImg);

  return res.status(201).json(uploadImg);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  upload,
};