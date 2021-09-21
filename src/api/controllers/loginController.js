const userService = require('../services/userService');

const login = async (req, res) => {
    const { email, password } = req.body;
    const vemail = userService.validateEmail(email);
    const vpassword = userService.validatePassword(password);
    const result = await userService.findByCredentials(email, password);
    if (result.status === 401) return res.status(result.status).json({ message: result.message });
    if (vemail.message === 'Email already registered') {
        return res.status(409).json({ message: vemail.message });
    } 

    if (vemail.message === 'Invalid entries. Try again.' 
    || vpassword.message === 'Invalid entries. Try again.') {
        console.log('alou');
        return res.status(400).json({ message: vemail.message });
    } 
   
    return res.status(200).json({ token: result.token });
  };

  module.exports = {
    login,
}; 