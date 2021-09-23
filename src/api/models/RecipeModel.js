const GenericDAOMongoDB = require('./GenericDAOMongoDB');

class RecipeModel extends GenericDAOMongoDB {
  constructor() {
    super('recipes');
  }
}

module.exports = RecipeModel;
