async function loginController(_req, res) {
  return res.status(200).json({ message: 'Funcionando em /login pelo controller' });
}

module.exports = {
  loginController,
};
