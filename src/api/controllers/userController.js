const userService = require('../services/userService');

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userService.create({ name, email, password });

    if (!user) {
      return res.status(400).send('error');
    }

    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(400).send('error catch');
  }
};
