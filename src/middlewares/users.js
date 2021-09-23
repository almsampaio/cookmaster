const schema = require('../schema');
const { services } = require('../services');

const checkNameUser = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(schema.status.badRequest).json({ message: schema.message.invalidEntries });
  }
  next();
};

const checkEmailUser = async (req, res, next) => {
  const { email } = req.body;
  const findUser = await services.find(email);
  const emailFormat = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email || !emailFormat) {
    return res.status(schema.status.badRequest).json({ message: schema.message.invalidEntries });
  }
  if (findUser) {
    return res.status(schema.status.conflict).json({ message: schema.message.emailRegistred });
  }
  next();
};

const checkPasswordUser = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(schema.status.badRequest).json({ message: schema.message.invalidEntries });
  }
  next();
};

module.exports = { checkNameUser, checkEmailUser, checkPasswordUser };
