const status = require('../api/status');
const modelUser = require('../models/users');

const servicesCreate = async (userInfo) => {
  const { email } = userInfo;
  const check = await modelUser.modelEmailFind(email);
  if (check) {
  return { status: status.HTTP_CONFLICT, 
    message: 'Email already registered' };
  }
  console.log(check);
  const newProduct = await modelUser.modelCreate(userInfo);
  return { status: status.HTTP_CREATED, info: newProduct };
};

module.exports = {
  servicesCreate,
};