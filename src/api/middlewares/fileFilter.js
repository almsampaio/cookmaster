const fileFilter = (req, file, callback) => {
  if (file.mimetype !== 'image/jpeg') {
    req.formatFile = false;
    return callback(null, false);
  }
  req.formatFile = true;
  return callback(null, true);
};

module.exports = fileFilter;
