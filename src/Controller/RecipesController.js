const RecipesService = require('../Service/RecipesService');

const recipeRegistration = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;
    const response = await RecipesService.recipeRegistration(data, token);
    res.status(201).json(response);
   } catch (err) {
    console.log(err.message);
  }
};

module.exports = { recipeRegistration };