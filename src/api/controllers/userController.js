const userService = require('../services/userService');

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { code, message, user } = await userService.create({ name, email, password });

    if (message) {
      return res.status(code).json({ message });
    }

    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(400).send('error catch');
  }
};
