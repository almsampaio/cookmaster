const rescue = require('express-rescue');
// Fonte: Pull Request do Luan Ramalho, turma 10 A e documentação:
// https://github.com/tryber/sd-010-a-cookmaster/blob/1806203adfa11ee3fc014a83d3062b093b8678f8/src/api/controllers/loginController.js
// https://www.npmjs.com/package/http-status-codes
const { StatusCodes: { UNAUTHORIZED, OK } } = require('http-status-codes');
const { loginServices } = require('../../services');

module.exports = [
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(UNAUTHORIZED).json({
        message: 'All fields must be filled',
      });
    }

    next();
  },

  rescue(async (req, res) => {
    const { email, password } = req.body;
    try {
      const token = await loginServices.getToken(email, password);
      res.status(OK).json({ token });
    } catch (e) {
      res.status(UNAUTHORIZED).json({ message: e.message });
    }
  }),
];
