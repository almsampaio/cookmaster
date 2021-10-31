const validateJWT = require('./validateJWT');
const validatePermission = require('./validatePermission');
const validateAdmin = require('./validateAdmin');

module.exports = {
  validateJWT,
  validatePermission,
  validateAdmin,
};