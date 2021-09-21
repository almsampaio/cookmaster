const ERROR_MESSAGE = 'Invalid entries. Try again.';
const HTTP_STATUS_BAD_REQUEST = 400;

const usersValidations = (name, email, password) => {
  if (!name || !email || !password) {
    return [
      { code: HTTP_STATUS_BAD_REQUEST },
      { message: ERROR_MESSAGE },
    ];
  }
  if (!email.match(/\S+@\S+\.\S+/)) {
    return [
      { code: HTTP_STATUS_BAD_REQUEST },
      { message: ERROR_MESSAGE },
    ];
  }
};
module.exports = {
  usersValidations,
};