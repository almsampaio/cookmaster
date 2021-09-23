const schema = require('../schema');
const { userServices } = require('../services');

const checkNameCreate = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.message.invalidEntries });
  }
  next();
};

const checkEmailCreate = async (req, res, next) => {
  const { email } = req.body;

  const emailFormat = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email || !emailFormat) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.message.invalidEntries });
  }

  const user = await userServices.find(email); 
  if (user) {
    return res
    .status(schema.status.conflict)
    .json({ message: schema.message.emailRegistred });
  }
  next();
};

const checkPasswordCreate = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.message.invalidEntries });
  }
  next();
};

const checkEmailLogin = async (req, res, next) => {
  const { password, email } = req.body;
  
  if (!email || !password) {
    return res
    .status(schema.status.unauthorized)
    .json({ message: schema.message.unfilledFields });
  }
  
  const emailUser = await userServices.find(email);
  
  if (!emailUser || email !== emailUser.email) {
    return res
    .status(schema.status.unauthorized)
    .json({ message: schema.message.wrongEmailPassword });
  }
  next();
};

const checkPasswordLogin = async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res
    .status(schema.status.unauthorized)
    .json({ message: schema.message.unfilledFields });
  }

  const passwordUser = await userServices.find(email);
  if (!passwordUser || passwordUser.password !== password) {
    return res
    .status(schema.status.unauthorized)
    .json({ message: schema.message.wrongEmailPassword });
  }
  next();
};

module.exports = {
  checkNameCreate,
  checkEmailCreate,
  checkPasswordCreate,
  checkEmailLogin,
  checkPasswordLogin,
};
