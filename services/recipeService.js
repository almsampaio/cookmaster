const recipeModel = require('../models/recipeModel');

// const jwt = require('jsonwebtoken');

// const secret = 'tokensecreto';

// const jwtConfig = {
//     expiresIn: '7d',
//     algorithm: 'HS256',
//   };

//   const token = jwt.sign({ user }, secret, jwtConfig);

//   res.status(200).json({ token });

// const {
//     // emailRegistered,
// // invalidEntries,
// // allFieldsFilled,
// // incorrectFieldData, /*
// wrongJWT,
// recipeNotFound,
// missingToken */ } = require('../utils/errorMessages');

const getRecipes = async () => {
    const result = await recipeModel.getRecipes();
    return result;
};

module.exports = {
    getRecipes,
};
