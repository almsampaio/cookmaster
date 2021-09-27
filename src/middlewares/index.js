const error = require('./error');
const middlewaresUsers = require('./users');
const middlewaresRecipes = require('./recipes');
const { imageUpload } = require('./multer');

module.exports = {
  error,
  middlewaresUsers,
  middlewaresRecipes,
  imageUpload,
};
