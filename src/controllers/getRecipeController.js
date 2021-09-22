const recipeModel = require('../models/recipeModel');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 200;

module.exports = async (_req, res) => {
  try {
    const response = await recipeModel.getAll();

    return res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ 
      Message: 'Sorry Our API is not working properly',
    });
  }
};