const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'src/uploads'); },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`); 
  },
  // Fonte: https://stackoverflow.com/questions/35050071/cant-get-multer-filefilter-error-handling-to-work
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/jpeg') {
      callback(new Error('Invalid file type.'));
    } else {
      callback(null, true);
    }
  },
});

module.exports = { storage };
