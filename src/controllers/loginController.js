const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'naoconteparaninguem';

const logIn = rescue(async (req, res) => {
    const { email, password } = req.body;

    const login = await loginService.logIn(email, password);
//    console.log(login);
  
    if (login) {
        return res.status(401).json(login);
    }

    const jwtConfig = {
        expiresIn: '1d',
        algorithm: 'HS256',
    };

    const token = jwt.sign({ data: login }, secret, jwtConfig);
    return res.status(200).json({ token });
});

module.exports = {
    logIn,
};