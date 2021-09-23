const rescue = require('express-rescue');

const {
  usersServices,
} = require('../../services');

const {
  usersModel,
} = require('../../models');

module.exports = [
  (req, res, next) => {
    const { name, email, password } = req.body;

    try {
      usersServices.validateUser(name, email, password);
      next();
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  rescue(async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const result = await usersModel.addUser(name, email, password);
      res.status(201).json({
        user: result,
      });
    } catch (e) {
      res.status(409).json({ message: e.message });
    }
  }),
];
