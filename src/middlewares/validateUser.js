const { validationResult } = require('express-validator');
const errors = require('../errors');
const UserService = require('../services/UserService');

const validateUser = async (req, res, next) => {
  const { email } = req.body;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ message: validation.array()[0].msg });
  }

  const userEmail = await UserService.findUserByEmail(email);

  if (userEmail) {
    return res.status(409).json({ message: errors.emailAlreadyRegistered });
  }

  next();
};

module.exports = validateUser;
