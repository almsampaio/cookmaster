async function register(_req, res, _next) {
  return res.status(200).json({ message: 'From Controller' });
}

module.exports = {
  register,
};
