const { badRequest } = require('../helpers/http');

function validate(request, response, next) {
  const data = request.body;
  if ((!data.name) || (!data.email) || (!data.password)) {
    return badRequest('Invalid entries. Try again.');
    // return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const valid = emailRegex.test(data.email);
  if (!valid) return badRequest('Invalid entries. Try again.');
  
  next();
}

module.exports = validate; 