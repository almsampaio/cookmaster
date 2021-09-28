const { makeLogin } = require('../servece/servLogin');

const makelogin = async (req, res) => {
  const { email, password } = req.body;
  const { status, response } = await makeLogin(email, password);
  return res.status(status).json(response);
};

module.exports = {
  makelogin,
};