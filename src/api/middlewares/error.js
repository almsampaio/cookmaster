function errorsPostUsers(err, res) {
  if (err.isJoy) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  return res.status(409).json({ message: 'Email already registered' });
}

function errorsPost(err, res) {
  if (err.item === 'users') {
    return errorsPostUsers(err, res);
  }
}

module.exports = (err, _req, res, _next) => {
  if (err.verb === 'post') {
    return errorsPost(err, res);
  }

  return res.status(500).json({ message: `Internal server error: ${err.message}` });
};