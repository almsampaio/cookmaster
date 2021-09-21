const ERROR_MESSAGE = 'All fields must be filled';
const HTTP_STATUS_UNAUTHORIZED = 401;

const loginValidations = (email, password) => {
  if (!email || !password) {
    return ({
      code: HTTP_STATUS_UNAUTHORIZED,
      message: ERROR_MESSAGE,
      });
  }
};
module.exports = {
  loginValidations,
};