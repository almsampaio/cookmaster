const mongoose = require('mongoose');

exports.usersModel = require('./usersModel');
exports.recipesModel = require('./recipesModel');

exports.isValidID = mongoose.Types.ObjectId.isValid;
