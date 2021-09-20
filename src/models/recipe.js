const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  preparation: String,
});

exports.recipeModel = mongoose.model('recipes', recipeSchema);

exports.isValidID = mongoose.Types.ObjectId.isValid;
