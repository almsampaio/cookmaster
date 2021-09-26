const mandatoryCreate = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return true;
};

const invalidEntries = {
  message: 'Invalid entries. Try again.',
};

const validate = (name, ingredients, preparation) => {
  switch (true) {
  case mandatoryCreate(name, ingredients, preparation): 
  return { code: 400, message: invalidEntries };
  default: return {};
  }
};

module.exports = { validate };