const STATUS = require('../util/myConstants');
const { findByEmail } = require('../services/userService');
const { postLoginValidate } = require('../schema/validationSchema');

const validatePostLogin = (req, _res, next) => {
  const { name, password, email } = req.body;
  const { error } = postLoginValidate.validate({ name, password, email });

  if (error) {
    return next({
      err: { message: 'Invalid entries. Try again.' },
      statusCode: STATUS.STATUS_400_BAD_REQUEST,
    });
  }

  next();
};

const isUniqueEmail = async (req, _res, next) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  if (user.length > 0) {
    return next({
      err: { message: 'Email already registered' },
      statusCode: STATUS.STATUS_409_CONFLICT,
    });
  }
  next();
};



module.exports = {
  validatePostLogin,
  isUniqueEmail,
};
