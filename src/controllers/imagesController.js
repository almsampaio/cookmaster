const { imagesService } = require('../services');

exports.readOne = async (req, res) => {
  const { id } = req.params;
  imagesService
  .readOne({ id })
  .then(({ code, pathFile }) => res.status(code).sendFile(pathFile))
  .catch(({ code, message }) => res.status(code).json({ message }));
};
