const connection = require('./connection');

const registration = async (data) => {
  const admin = { ...data };
  connection().then().then().catch((e) => e.message);
  return admin;
};

module.exports = { registration };