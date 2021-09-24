const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secret = 'secret123';

module.exports = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(401).json({
      message: 'All fields must be filled'
    })

    const user = await userModel.findUserByEmail(email);
    
    if (!user || user.password !== password) return res.status(401).json({
      message: 'Incorrect username or password'
    })

    const jwtconfig = {
      expiresIn: '15m',
      algorithm: 'HS256'
    };

    const formattedUser = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign({data: formattedUser}, secret, jwtconfig);
    return res.status(200).json({token});
  } catch(e) {
    return res.status(505).json({ message: 'Erro interno', error: e });
  }
}
