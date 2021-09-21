const rescue = require('express-rescue');
const { StatusCodes: { CREATED } } = require('http-status-codes');
const service = require('../services/usersService');

module.exports = rescue(async (req, res) => {
  const { name, email, password } = req.body;
    const result = await service.createUser(
      name,
      email,
      password,
    );
    res.status(CREATED).json(result);
});
