const { BAD_REQUEST } = require('../utils/status');

const textsMessages = {
  badReq: { message: 'Invalid entries. Try again.' },
};

const usersVAlidations = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json(textsMessages.badReq);
  }
  next();
};

module.exports = { usersVAlidations };
