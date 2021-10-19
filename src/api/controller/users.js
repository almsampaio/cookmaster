const {
    createServices,
    createTokenServices,
  } = require('../services/users');
  
  const createController = async (req, res) => {
    const { name, email, password } = req.body;
    const role = 'user';
    const { message, data } = await createServices(name, email, password, role);
  
    if (!data) {
      return res.status(409).json({
        message,
      });
    }
  
    return res.status(201).json({
      user: data,
    });
  };
  
  const createAdminController = async (req, res) => {
    const { name, email, password } = req.body;
    const { role } = req.userAdmin;
  
    const { message, data } = await createServices(name, email, password, role);
  
    if (!data) {
      return res.status(409).json({
        message,
      });
    }
  
    return res.status(201).json({
      user: data,
    });
  };
  
  const createTokenController = async (req, res) => {
    const { email, password } = req.body;
    const { message, token } = await createTokenServices(email, password);
  
    if (!token) {
      return res.status(401).json({ message });
    }
  
    return res.status(200).json({
      token,
    });
  };
  
  module.exports = {
    createController,
    createAdminController,
    createTokenController,
  };