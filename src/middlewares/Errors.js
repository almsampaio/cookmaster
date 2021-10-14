module.exports = (err, _req, res, _next) => {
  if (err.isJoi) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: err.message });
};