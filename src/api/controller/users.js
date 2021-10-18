const {
    HTTP_CONFLICT,
    HTTP_UNAUTHORIZED,
    HTTP_CREATED,
    HTTP_OK_STATUS,
  } = require('../../schemas/status');
  
  const {
    createServices,
    createTokenServices,
  } = require('../services/users/usersService');
  
  const createController = async (req, res) => {
    const { name, email, password } = req.body;
    const role = 'user';
    const { message, data } = await createServices(name, email, password, role);
  
    if (!data) {
      return res.status(HTTP_CONFLICT).json({
        message,
      });
    }
  
    return res.status(HTTP_CREATED).json({
      user: data,
    });
  };
  
  const createAdminController = async (req, res) => {
    const { name, email, password } = req.body;
    const { role } = req.userAdmin;
  
    const { message, data } = await createServices(name, email, password, role);
  
    if (!data) {
      return res.status(HTTP_CONFLICT).json({
        message,
      });
    }
  
    return res.status(HTTP_CREATED).json({
      user: data,
    });
  };
  
  const createTokenController = async (req, res) => {
    const { email, password } = req.body;
    const { message, token } = await createTokenServices(email, password);
  
    if (!token) {
      return res.status(HTTP_UNAUTHORIZED).json({ message });
    }
  
    return res.status(HTTP_OK_STATUS).json({
      token,
    });
  };
  
  module.exports = {
    createController,
    createAdminController,
    createTokenController,
  };