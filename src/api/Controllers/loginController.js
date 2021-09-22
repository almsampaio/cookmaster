const loginServices = require('../Services/loginServices');

const INTERNAL_SERVER_ERROR = 500;

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { code, message, token } = await loginServices.userLogin(email, password);

    return res.status(code).json({ message, token });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: 'Erro interno', error: err },
    );
  }
};
module.exports = {
  userLogin,
};