const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const loginService = require('../services/loginService');

const app = express();
app.use(bodyParser.json());

const loginController = rescue(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.loginService(email, password);

  if (result.err) {
    return res.status(result.err.status).json({ message: result.err.message });
  }

  return res.status(200).json({ token: result });
});

module.exports = {
  loginController,
};