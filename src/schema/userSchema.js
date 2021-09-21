// const { ObjectId } = require('bson');

const errors = {
  invalidEntries: 'Invalid entries. Try again.',
  // nameLenghtLessTahnFive: '"name" length must be at least 5 characters long',
  // quantityNotNumber: '"quantity" must be a number',
  // quantityLessThanOne: '"quantity" must be larger than or equal to 1',
  // WrongIdFormat: 'Wrong id format',
};
const code = 400;

const verifyTypeString = (data) => typeof data === 'string';
// const verifyTypeNumber = (data) => typeof data === 'number';
const verifyMinLength = (data, minLength) => data.length < minLength;

const validateName = (name) => {
  switch (true) {
    case !name: return { code, message: errors.invalidEntries };
    case !verifyTypeString(name): return { code, message: errors.invalidEntries };
    case verifyMinLength(name, 1): return { code, message: errors.invalidEntries };
    default: return false;
  }
};

const validatePassword = (password) => {
  switch (true) {
    case !password: return { code, message: errors.invalidEntries };
    case !verifyTypeString(password): return { code, message: errors.invalidEntries };
    case verifyMinLength(password, 5): return { code, message: errors.invalidEntries };
    default: return false;
  }
};

const findValueInArrayOfObjects = (array, value, key) => {
  const result = array.find((object) => object[key] === value);
  if (result) return true;
  return false;
};

// const validateId = (id) => {
//   const idExists = ObjectId.isValid(id);
//   if (!idExists) return { code, message: errors.WrongIdFormat };
//   return true;
// };

module.exports = {
  validateName,
  validatePassword,
  // validateQuantity,
  findValueInArrayOfObjects,
  // validateId,
};
