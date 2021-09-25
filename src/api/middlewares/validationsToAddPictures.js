const validations = require('../services/validations');

const validationsToAddPictures = async (req, _res, next) => {
  // console.log('entrou aqui no validations')
  const token = req.headers.authorization;
  const validationsToken = await validations
  .validateTokenToUpdateRecipes(token);

  if (validationsToken.error) return next(validationsToken);

  // console.log('não teve erro aqui no validation')

  next();
};

module.exports = {
  validationsToAddPictures,
};
