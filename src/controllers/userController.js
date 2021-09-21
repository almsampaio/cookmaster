const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const userService = require('../services/userService');

const app = express();
app.use(bodyParser.json());

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userService.userRegistered(name, email, password);
  if (result.err) {
    return res.status(result.err.status).json({ message: result.err.message });
  }

  return res.status(201).json({ user: result });
});

module.exports = {
  createUser,
};