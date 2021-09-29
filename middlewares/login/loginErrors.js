// Error messages
const empytDefaultMessage = 'All fields must be filled';
const invalidDefaultMessage = 'Incorrect username or password';

// http codes
const unauthorized = 401;

const errorsMessage = {
  empty: 
  {
    email: {
      message: empytDefaultMessage,
      code: unauthorized,
    },
    password: {
      message: empytDefaultMessage,
      code: unauthorized,
    },
  },
  invalid: {
    email: {
      message: invalidDefaultMessage,
      code: unauthorized,
    },
  },
};

module.exports = errorsMessage;
