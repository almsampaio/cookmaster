const express = require('express');
const rescue = require('express-rescue');
const bodyparser = require('body-parser');
// const jwt = require('jsonwebtoken');

// const secret = 'secret';

const app = express();
app.use(bodyparser.json());
const service = require('../services/login');

const login = rescue(async (req, res) => {
    const { email, password } = req.body;
    const userLogin = await service.login(email, password);
  
    if (userLogin.message) {
      return res.status(401).json(userLogin);
    }
    return res.status(200).json(userLogin);
  });
  
  module.exports = { login };