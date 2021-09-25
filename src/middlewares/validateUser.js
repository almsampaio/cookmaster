const { validationResult } = require('express-validator');

const validateUser = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ message: validation.array()[0].msg });
  }

  next();
};

module.exports = validateUser;
