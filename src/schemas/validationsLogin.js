const err = {
  fieldRequired: 'All fields must be filled',
};

const validateEmail = (email) => {
  if (!email) return { message: err.fieldRequired };
  return false;
};

module.exports = {
  validateEmail,
};
