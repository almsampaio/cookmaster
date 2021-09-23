const { validateSignupForm } = require('./validateSignupForm');
const { validateLoginForm } = require('./validateLoginForm');
const { validateJWT } = require('./validateJWT');
const { validateRecipeForm } = require('./validateRecipeForm');
const { validateUpload } = require('./validateUpload');

module.exports = {
  validateSignupForm,
  validateLoginForm,
  validateJWT,
  validateRecipeForm,
  validateUpload,
};