const make = () => ({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

module.exports = {
  make,
};