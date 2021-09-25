const { recipeValidate } = require('../schema/validationSchema');
const STATUS = require('../util/myConstants');

const existsRecipesFields = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = recipeValidate.validate({ name, ingredients, preparation });
  if(error) {
    return next({
      err: { message: 'Invalid entries. Try again.' },
      statusCode: STATUS.STATUS_400_BAD_REQUEST,
    });
  }

  next();
};

module.exports = {
  existsRecipesFields,
};
