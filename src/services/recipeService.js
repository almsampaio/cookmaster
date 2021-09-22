const recipeModel = require('../models/recipeModel');
const userSchema = require('../schema/userSchema');

// const findById = async (id) => {
//  const idExists = productSchema.validateId(id);
//   if (idExists === true) {
//     const response = await productModel.getById(id);
//     if (response.length === 0) return ({ code: 'invalid_data', message: 'Wrong id format' });
//     return response[0];
//   }
//   return (idExists);
// };

const insertRecipe = async (name, ingredients, preparation, userId) => {
    if (name === undefined || ingredients === undefined || preparation === undefined) { 
    return ({ code: 400, message: 'Invalid entries. Try again.' }); 
    }

  const data = await recipeModel.getAll();
  const alreadyExists = userSchema.findValueInArrayOfObjects(data, name, 'name');

  if (alreadyExists) return ({ code: 409, message: 'Recipe already exists' });

  const response = await recipeModel.create({ name, ingredients, preparation, userId });
  return response;
};

// const findByCredentials = async (email, password) => {
//   if (password === undefined || email === undefined) { 
//     return ({ code: 401, message: 'All fields must be filled' }); 
//   }

//   const data = await userModel.getByEmail(email);
//   if (data.length === 0) return ({ code: 401, message: 'Incorrect username or password' });

//   const checkPassword = userSchema.findValueInArrayOfObjects(data, password, 'password');
//   if (!checkPassword) return ({ code: 401, message: 'Incorrect username or password' });

//   const token = jwt.sign(email, SECRET);
//   console.log(token);
//   return { token };
// };

module.exports = {
  insertRecipe,
  // findByCredentials,
};
