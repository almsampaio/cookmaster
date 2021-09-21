const adminService = require('../service/adminService');

const postAdmin = async (req, res) => {
  const { name, password, email } = req.body;
  const { user } = req;
  const admin = await adminService.postAdmin(user, name, password, email);

  if (admin.message) {
    return res.status(403).json(admin);
  }

  return res.status(201).json(admin);
};

module.exports = { postAdmin };
