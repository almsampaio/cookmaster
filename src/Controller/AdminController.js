const AdminService = require('../Service/AdminService');

const adminRegistration = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;
    const response = await AdminService.adminRegistration(data, token);
    res.status(201).json(response);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

module.exports = { adminRegistration };