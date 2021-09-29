// Error messages
const empytDefaultMessage = 'Invalid entries. Try again.';
const invalidDefaultMessage = 'Invalid entries. Try again.';
const notFoundDefaultMessage = 'recipe not found';

// http codes
const badRequest = 400;
const unauthorized = 401;
const notFound = 404;

const recipesErrors = {
  empyt: 
  { message: empytDefaultMessage,
    code: badRequest,
  },
  invalid: {
    token: {
      message: invalidDefaultMessage,
      code: unauthorized,
    },
  },
  notFound: {
    message: notFoundDefaultMessage,
    code: notFound,
  },
};

module.exports = recipesErrors;
