const userService = require('../services/userService');

const registerUser = async (req, res) => {
    const user = req.body;
    const result = await userService.registerUser(user);
    // console.log('result - - - - -- Controller', result);
    // console.log('STATUS - - - - - - -- -', result.status, 'MESSAGE - - - - ', result.message);
    if (result.message) return res.status(result.status).send(result.message);
    return res.status(201).send(result);
};

const checkLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('email, password -  - - - CONTROLLER', email, password);
    console.log('req.body -  - - - CONTROLLER', req.body);
    const result = await userService.checkLogin({ email, password });
    console.log('result -  - - - CONTROLLER', result);
    if (result.message) return res.status(result.status).send(result.message);
    return res.status(200).send(result);
};

module.exports = {
    registerUser,
    checkLogin,
};
