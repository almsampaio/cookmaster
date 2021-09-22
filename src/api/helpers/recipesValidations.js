const ERROR_MESSAGE = 'Invalid entries. Try again.';
const HTTP_STATUS_BAD_REQUEST = 400;

const recipesValidations = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return ({
      code: HTTP_STATUS_BAD_REQUEST,
      message: ERROR_MESSAGE,
    });
  }
};
module.exports = {
  recipesValidations,
};