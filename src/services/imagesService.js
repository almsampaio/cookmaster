const { StatusCodes } = require('http-status-codes');
const path = require('path');
const { notFoundError } = require('../validations/Errors');

exports.readOne = async ({ id }) => {
  try {
    const pathFile = path.join(__dirname, `../uploads/${id}`);
    return { code: StatusCodes.OK, pathFile };
  } catch (_err) {
    throw notFoundError('image not found');
  }
};
