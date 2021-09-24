const userSchema = require('../schemas/user');

const findUserByEmail = require('../useCases/findUserByEmail/findByEmailService');
const { conflict, badRequest } = require('../utils/httpStatus');

exports.userValidate = async (request, _response, next) => {
  const { name, email, password } = request.body;
  
  const { error } = userSchema.validate({ name, email, password });

  if (error) return next({ message: 'Invalid entries. Try again.', status: badRequest });

  const emailAlreadyExists = await findUserByEmail(email);

  if (emailAlreadyExists) return next({ message: 'Email already registered', status: conflict });

  next();
};
