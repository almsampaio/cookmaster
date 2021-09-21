const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes');

const commonUser = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
};

module.exports = commonUser;