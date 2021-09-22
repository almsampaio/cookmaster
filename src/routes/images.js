const express = require('express');

const route = express.Router();

// Source
// https://stackoverflow.com/questions/16338227/getting-filetype-in-an-express-route
route.get('/:id.:jpeg');

module.exports = route;