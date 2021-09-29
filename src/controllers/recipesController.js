const rescue = require('express-rescue');
const recipeService = require('../services/recipesService');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userId = _id;
  
  const recipes = await recipeService.create(name, ingredients, preparation, userId);

  if (recipes.message) return res.status(400).json(recipes);

  return res.status(201).json(recipes);
});

const getAll = (rescue(async (_req, res) => {
    const recipes = await recipeService.getAll();

 //   console.log(recipes);
    res.status(200).json(recipes);
}));

const getById = (rescue(async (req, res) => {
    const { id } = req.params;

    const recipes = await recipeService.getById(id);
    
    if (recipes.message) return res.status(404).json(recipes);
    
 //   console.log(recipes);

    return res.status(200).json(recipes);
}));

const update = (rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;

    const recipes = await recipeService.update(id, name, ingredients, preparation);
        
    return res.status(200).json(recipes);
}));

const exclude = (rescue(async (req, res) => {
    const { id } = req.params;

    const recipes = await recipeService.exclude(id);

    res.status(204).json(recipes);
}));

const imageAdded = (rescue(async (req, res) => {
    const { id } = req.params;
    const urlImage = `${id}.jpeg`;
                                  
    const recipes = await recipeService.imageAdded(id, urlImage);
    res.status(200).json(recipes);
}));

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
    imageAdded,
};