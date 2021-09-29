// Error messages
const empytDefaultMessage = 'missing auth token';
const invalidDefaultMessage = 'jwt malformed';

// http codes
const unauthorized = 401;

const authErrors = {
  empyt: 
  { message: empytDefaultMessage,
    code: unauthorized,
  },
  invalid: {
      message: invalidDefaultMessage,
      code: unauthorized,
  },
};

module.exports = authErrors;
