const { uploadFile } = require('../api/uploadFile');

const uploads = (async (req, res) => {
  // const { id } = req.params;
  // const { file } = req.file;
  const receivedFile = uploadFile();
  if (receivedFile.err) {
    return res.status(422).json(receivedFile);
  }
  res.status(204).json();
});
module.exports = { uploads };