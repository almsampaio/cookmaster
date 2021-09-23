// const jwt = require('jsonwebtoken');
const users = require('../models/users');
// const { userSchema, loginSchema } = require('../helpers/validation.schema');

// const secret = 'superseguro123';
// const jwtConfig = {
//   algorithm: 'HS256',
// };

// const OK_STATUS = 200;
const CREATED_STATUS = 201;
// const BAD_REQUEST_STATUS = 400;
// const UNAUTHORIZED_STATUS = 401;
const CONFLICT_STATUS = 409;

const createUser = async (name, email, password, role) => {
  const repeatedEmail = await users.findByEmail(email);
  if (repeatedEmail) {
    return {
      status: CONFLICT_STATUS, message: 'Email already registered',
    }; 
}

  const data = await users.createUser(name, email, password, role);

  return { status: CREATED_STATUS, data };
};

// const createToken = async (data) => {
//   const { error } = loginSchema.validate(data);
//   if (error) return { status: UNAUTHORIZED_STATUS, message: 'All fields must be filled' };

//   const findUser = await users.findByEmail(data.email);
//   if (!findUser) {
//     return {
//       status: UNAUTHORIZED_STATUS, err: { message: 'Incorrect username or password' },
//     }; 
// }

//   const token = jwt.sign({ data: findUser }, secret, jwtConfig);
//   return { status: OK_STATUS, token };
// };

module.exports = {
  createUser,
  // createToken,
};
