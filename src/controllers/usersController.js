const rescue = require('express-rescue');
const Joi = require('joi');

const service = require('../services/usersService');

const ERROR_MESSAGE = 'Invalid entreies. Try again.';

const create = rescue(async (req, res) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty()
    .required()
    .message(ERROR_MESSAGE),

    email: Joi.string().email().not().empty()
    .required()
    .message(ERROR_MESSAGE),

    password: Joi.string().not().empty()
    .required()
    .message(ERROR_MESSAGE),
  })
   .validate(req.body);

   if (error) res.status(400).json({ message: error.details[0].message });

   const { name, email, password } = req.body;

   const createUser = await service.create(name, email, password);

   if (createUser.err) return res.status(409).json(createUser.err.message);

   res.status(201).json(createUser);
});

module.exports = {
  create,
};
