const userSchema = require('../../schemas/userSchema');

const authUser = async (req, _res, next) => {
  const { email, password, name } = req.body;

  const { error } = userSchema.validate(
    { email, password, name },
    { abortEarly: false },
  );

  if (error) {
    const err = { ...error, code: 400, isJoi: true };

    return next(err);
  }

  next();
};

module.exports = authUser;
