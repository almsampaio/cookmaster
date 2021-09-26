class Recipe {
  constructor(recipeInfos) {
   this.userId = recipeInfos.userId;
   this.name = recipeInfos.name;
   this.ingredients = recipeInfos.ingredients;
   this.preparation = recipeInfos.preparation;
  }
}

module.exports = Recipe;
