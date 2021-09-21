const rescue = require('express-rescue');
const Joi = require('joi');

const service = require('../services/usersService');
const login = require('./login');

const ERROR_MESSAGE = 'Invalid entries. Try again.';

const create = rescue(async (req, res) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty()
    .required(),

    email: Joi.string().email().not().empty()
    .required(),

    password: Joi.string().not().empty()
    .required(),
  })
   .validate(req.body);

   if (error) {
    return res.status(400).json({ message: ERROR_MESSAGE });
   }

   const { name, email, password } = req.body;

   const createUser = await service.create(name, email, password);

   if (createUser.err) return res.status(409).json({ message: createUser.err.message });

   res.status(201).json(createUser);
});

module.exports = {
  create,
  login,
};
