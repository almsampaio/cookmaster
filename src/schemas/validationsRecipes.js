// 400
// message: 'Invalid entries. Try again.'

// 401
// message: 'jwt malformed'

const err = { fieldRequired: 'Invalid entries. Try again.' };

const fieldsRequired = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return { message: err.fieldRequired };
  return false;
};

module.exports = {
  fieldsRequired,
};
