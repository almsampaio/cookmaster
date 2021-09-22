const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  // VERIFICAR PLANTÃO A RESPEITO DO USERID = REQ E NÃO REQ.USER (VERIFICAR AUTHMID).
  const { userId } = req;
  // console.log(userId);

  const recipeData = req.body;

  const { status, message, recipe } = await recipeService.create(recipeData, userId);
  if (!recipe) return res.status(status).json({ message });
  res.status(status).json({ recipe });
};

const getAll = async (_req, res) => {
  const { status, recipes } = await recipeService.getAll();
  res.status(status).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message, recipe } = await recipeService.getById(id);
  if (!recipe) return res.status(status).json({ message });
  res.status(status).json(recipe);
};

module.exports = {
  create,
  getAll,
  getById,
};

// Validação do userId(req3) foi utilizado como referência pull request do colega Thalys Carrara: (https://github.com/tryber/sd-010-a-cookmaster/pull/52/commits/d73d9526edce2eef159aff84377b63b5a8c9495b)