const errorMsg = require('./errorMsg');

const checkName = (name) => {
  if (!name) return errorMsg.invalidEntries;
  return false;
};

const checkEmail = (email) => {
  const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  const validEmail = regex.test(email);
  if (!email || !validEmail) return errorMsg.invalidEntries;
  return false;
};

module.exports = {
  checkName,
  checkEmail,
};
