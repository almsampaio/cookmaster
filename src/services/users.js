const status = require('../api/status');
const modelUser = require('../models/users');

const servicesCreate = async (userInfo) => {
  const { email } = userInfo;
  const check = await modelUser.modelEmailFind(email);
  if (check) { return { status: status.HTTP_CONFLICT, message: 'Email already registered' }; }
  const newUser = await modelUser.modelCreate(userInfo);
  return { status: status.HTTP_CREATED, info: newUser };
};

const servicesAdminCreate = async (userInfo) => {
  const { email } = userInfo;
  const check = await modelUser.modelEmailFind(email);
  if (check) { return { status: status.HTTP_CONFLICT, message: 'Email already registered' }; }
  const newUser = await modelUser.modelAdminCreate(userInfo);
  return { status: status.HTTP_CREATED, info: newUser };
};

module.exports = {
  servicesCreate,
  servicesAdminCreate,
};