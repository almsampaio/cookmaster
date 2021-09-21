const route = require('express').Router();
const rescue = require('express-rescue');

route.post('/', rescue(async (req, res) => {

}));

module.exports = (app) => app.use('/users', route);