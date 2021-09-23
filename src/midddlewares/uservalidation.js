const Joi = require('joi');

// const OK_STATUS = 200;
// const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
// const UNAUTHORIZED_STATUS = 401;
// const CONFLICT_STATUS = 409;

// Ref: https://www.youtube.com/watch?v=u9kxYilQ9l8

const userSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

const userValidation = (req, res, next) => {
  const { email, password, name } = req.body;
  const user = { name, email, password };
  const { error } = userSchema.validate(user);
  console.log(error);
  if (error) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'Invalid entries. Try again.' });
    }

  next();
};

module.exports = {
  userValidation,
};