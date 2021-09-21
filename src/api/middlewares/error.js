module.exports = (err, _req, res, _next) => {
  if (err.isJoy && err.verb === 'post') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return res.status(500).json({ message: `Internal server error: ${err.message}` });
};