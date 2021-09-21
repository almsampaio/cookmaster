const { usersService } = require('../services');

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  usersService
    .create({ name, email, password })
    .then(({ code, result }) => res.status(code).json({ user: result }))
    .catch(({ code, message }) => res.status(code).json({ message }));
};
