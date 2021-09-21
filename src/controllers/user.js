const userService = require('../services/user');

const addProduct = async (req, res) => {
  const { email, pass, name, role } = req.body;
  const user = { email, pass, name, role };
  const newProduct = await userService.addUser(user);

  if (!newProduct.error) return res.status(201).json(newProduct);
  return res.status(newProduct.error).json(newProduct);
};

module.exports = {
  addProduct,
};
