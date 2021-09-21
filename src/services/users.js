const Joi = require('joi');
const Users = require('../models/users');

const schemaUsers = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const create = async (data) => {
  console.log(data);
  const { email: emailUser } = data;
  const { error } = schemaUsers.validate(data);
  if (error) return { status: 400, err: { message: 'Invalid entries. Try again.' } };

  const findUserEmail = await Users.getByEmail(emailUser);
  if (findUserEmail) return { status: 409, err: { message: 'Email already registered' } };

  const { _id, name, email, role } = await Users.create(data);
  return { status: 201, data: { user: { _id, name, email, role } } };
};

module.exports = {
  create,
};