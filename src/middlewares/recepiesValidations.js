const nameVerify = async (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const ingredientsVerify = async (request, response, next) => {
  const { ingredients } = request.body;
  if (!ingredients || ingredients === '') {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const preparationVerify = async (request, response, next) => {
  const { preparation } = request.body;
  if (!preparation || preparation === '') {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  nameVerify,
  ingredientsVerify,
  preparationVerify,
};
