// Error messages
const empytDefaultMessage = 'Invalid entries. Try again.';
const invalidDefaultMessage = 'Invalid entries. Try again.';
const emailAlreadyExists = 'Email already registered';

// http codes
const badRequest = 400;
const conflict = 409;

const usersErrors = {
  empyt: 
  {
    name: {
      message: empytDefaultMessage,
      code: badRequest,
    },
    email: {
      message: empytDefaultMessage,
      code: badRequest,
    },
    password: {
      message: empytDefaultMessage,
      code: badRequest,
    },
  },
  invalid: {
    email: {
      message: invalidDefaultMessage,
      code: badRequest,
    },
  },
  alreadyExists: {
    email: {
      message: emailAlreadyExists,
      code: conflict,
    },
  },
};

module.exports = usersErrors;
