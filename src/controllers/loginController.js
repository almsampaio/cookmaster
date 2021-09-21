const HTTP_OK_STATUS = 200;
const response = { xablau: 'ok' };

module.exports = (_req, res) => {
  res.status(HTTP_OK_STATUS).json(response);
};