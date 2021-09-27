const { postRecipe } = require('./recipesService');

async function controlPostRecipe(req, res) {
  const { name, ingredients, preparation } = req.body;
  const tryPostRecipe = await postRecipe(name, ingredients, preparation);
  if (tryPostRecipe.statusCode) {
    const { statusCode, message } = tryPostRecipe;
    return res.status(statusCode).json({ message });
  }
  return res.status(201).json({ recipe: tryPostRecipe });
}

module.exports = {
  controlPostRecipe,
};
