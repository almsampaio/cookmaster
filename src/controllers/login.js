const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const secret = 'secrettoken';

module.exports = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401)
        .json({ message: 'All fields must be filled' });
    }

    const user = await User.findByEmail(email);

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: 'Incorrect username or password' });
    }

    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    res.status(200).json({ token });
};
