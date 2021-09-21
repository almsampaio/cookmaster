async function register(req, res) {
  return res.status(200).json('register from controller');
}

module.exports = {
  register,
};
