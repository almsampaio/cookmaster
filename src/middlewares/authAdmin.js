const authAdmin = (req, _res, next) => {
  const { role } = req.token;

  if (role !== 'admin') {
    const err = {
      isError: true,
      code: 403,
      message: 'Only admins can register new admins',
    };

    next(err);
  }

  next();
};

module.exports = authAdmin;
