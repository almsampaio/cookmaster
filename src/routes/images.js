const express = require('express');
const rescue = require('express-rescue');
const imagesController = require('../controllers/images');

const route = express.Router();

// Source
// https://stackoverflow.com/questions/16338227/getting-filetype-in-an-express-route
route.get('/:id.:jpeg', rescue(imagesController.getRecipeImageById));

module.exports = route;