const rescue = require('express-rescue');
const { StatusCodes: { CREATED, FORBIDDEN } } = require('http-status-codes');
const service = require('../services/usersService');

module.exports = rescue(async (req, res) => {
  const { name, email, password } = req.body;
    const { role } = req.payload.data;
    console.log(req.payload.data.role);
    if (role !== 'admin') {
      return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
    }
    const result = await service.createAdmin(
      name,
      email,
      password,
    );
    res.status(CREATED).json(result);
});
