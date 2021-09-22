const { StatusCodes: { CREATED, OK } } = require('http-status-codes');
const userService = require('../services/userService');

const createNewUser = async (req, res) => {
    const { name, email, password } = req.body;
      const result = await userService.createNewUser({ name, email, password });
      res.status(CREATED).json({
        user: {
          name,
          email,
          role: 'user',
          _id: result.insertedId,
        },
      });    
};

const login = async (req, res) => {
  const token = await userService.login(req.body);
  res.status(OK).json(token);
};

module.exports = {
  createNewUser,
  login,
};