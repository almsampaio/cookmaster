const { postRecipe, getAllRecipes } = require('./recipesService');

async function controlPostRecipe(req, res) {
  const { name, ingredients, preparation } = req.body;
  const { email } = req.validated;
  const recipe = { name, ingredients, preparation };
  const user = { email };
  const tryPostRecipe = await postRecipe(recipe, user);
  if (tryPostRecipe.statusCode) {
    const { statusCode, message } = tryPostRecipe;
    return res.status(statusCode).json({ message });
  }
  return res.status(201).json({ recipe: tryPostRecipe });
}

async function controlGetRecipes(_req, res) {
  const allRecipes = await getAllRecipes();
  if (allRecipes.statusCode) {
    const { statusCode, message } = allRecipes;
    return res.status(statusCode).json({ message });
  }
  return res.status(200).json(allRecipes);
}

module.exports = {
  controlPostRecipe,
  controlGetRecipes,
};
