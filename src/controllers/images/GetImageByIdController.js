const path = require('path');

class GetImageByIdController {
  static async handle(req, res) {
    const { id: fileName } = req.params;

    const pathFile = path.join(__dirname, `../../uploads/${fileName}`);

    res.status(200).sendFile(pathFile);
  }
}

module.exports = GetImageByIdController;
