const express = require('express');
const rescue = require('express-rescue');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
const service = require('../services/users');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  
  const createdUser = await service.createUser(name, email, password);
  if (createdUser.err) {
    return res.status(409).json(createdUser.err);
  }
  if (createdUser.message) {
    return res.status(400).json(createdUser);
  }
  return res.status(201).json(createdUser);
});

module.exports = { createUser };