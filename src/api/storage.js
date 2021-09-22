const multer = require('multer');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, _file, cb) => {
        const { id } = req.params;
        const name = `${id}.jpeg`;
        cb(null, name);
    },
});

module.exports = storage;