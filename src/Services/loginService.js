const loginSchema = require('../Models/loginSchema');
const loginModel = require('../Models/loginModel');
const { invLogin, allSpacesValidate, HTTP_401 } = require('../helpers');

const validateLogin = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    const { email, password } = req.body;

    if (error) {
      return res.status(HTTP_401).json(allSpacesValidate);
    }

    const emailAndPass = await loginModel.findEmailAndPass(email, password);
    if (!emailAndPass) {
      return res.status(HTTP_401).json(invLogin);
    }
    
    next();
  } catch (e) {
   console.log(e);
  }
};

module.exports = {
  validateLogin,
};
