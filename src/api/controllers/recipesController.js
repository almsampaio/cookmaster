const recipesService = require('../service/recipesService');

module.exports = {
  async create(req, res) {
    const { name, ingredients, preparation } = req.body;
    const { user } = req; 

    const newRecipe = await recipesService.create(name, ingredients, preparation, user);

    return res.status(201).json({ recipe: newRecipe });
  },

  async index(req, res) {
    const recipes = await recipesService.findAll();

    return res.status(200).json(recipes);
  },

  async show(req, res) {
    const { id } = req.params;

    const recipe = await recipesService.findOne(id);

    return res.status(200).json(recipe);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const editedRecipe = await recipesService.update(id, name, ingredients, preparation);

    return res.status(200).json({ ...editedRecipe, userId: _id });
  },
};