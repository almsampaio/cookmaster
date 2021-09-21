const Joi = require('joi');
const userServices = require('../services/user');

const registerUser = async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const { name, email, password } = req.body;
  const result = await userServices.registerUser(name, email, password);
  if (result.error) return next(result.error);

  res.status(201).json(result);
};

module.exports = {
  registerUser,
};
