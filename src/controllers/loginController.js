const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');
const userModel = require('../models/usersModel');

const secret = 'naoconteparaninguem';

const logIn = rescue(async (req, res) => {
    const { email, password } = req.body;
    
    const login = await loginService.logIn(email, password);
  
    if (login.message) {
        return res.status(401).json(login);
    }

    const jwtConfig = {
        expiresIn: '1d',
        algorithm: 'HS256',
    };
    
    const getUser = await userModel.getLoginByEmail(login.email);

    const token = jwt.sign({ data: getUser }, secret, jwtConfig);
    return res.status(200).json({ token });
});

module.exports = {
    logIn,
};