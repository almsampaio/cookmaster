const registerSchema = require('../../schemas/registerSchema');

const authLogin = async (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = registerSchema.validate(
    { email, password },
    { abortEarly: false },
  );

  if (error) {
    const err = { ...error, code: 401, isJoi: true };

    return next(err);
  }

  next();
};

module.exports = authLogin;
