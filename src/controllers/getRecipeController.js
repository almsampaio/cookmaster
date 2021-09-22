const recipeModel = require('../models/recipeModel');
const recipeService = require('../services/recipeService');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const getAll = async (_req, res) => {
  try {
    const response = await recipeModel.getAll();

    return res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ 
      Message: 'Sorry Our API is not working properly',
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await recipeService.findById(id);

    if (response.code) {
      return res.status(HTTP_NOT_FOUND_STATUS).json({
          message: 'recipe not found',
      });
  }
  
    return res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ 
      Message: 'Sorry Our API is not working properly',
    });
  }
};

module.exports = {
  getAll,
  getById,
};