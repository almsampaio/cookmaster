const textMessages = {
  malformed: { message: 'jwt malformed' },
  deleted: { message: 'missing auth token' },
};

const SECRET = 'secret';
const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json(textMessages.malformed);
  }

  try {
    const { _id } = jwt.verify(token, SECRET);
    req.user = _id;
  } catch (_e) {
    return res.status(401).json(textMessages.malformed);
  }

  next();
};

const tokenValidationDelete = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json(textMessages.deleted);
  }

  try {
    const { _id } = jwt.verify(token, SECRET);
    req.user = _id;
  } catch (_e) {
    return res.status(401).json(textMessages.deleted);
  }
  next();
};

module.exports = { tokenValidation, tokenValidationDelete };
