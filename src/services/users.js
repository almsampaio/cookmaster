const status = require('../api/status');
const modelUsers = require('../models/users');

const servicesCreate = async (saleData) => {
  // const { productId } = saleData[0];
  // const check = await model.modelGetById(productId);
  // if (!check) {
  // return { status: status.HTTP_UNPROCESSABLE_ENTITY, 
  //   message: 'Wrong product ID or invalid quantity' };
  // }
  // const map = await saleData.map(async (e) => {
  //   const getBy = await modelProduct.modelGetById(e.productId);
  //   if (getBy.quantity - e.quantity < 0) { return true; }
  //   await modelProduct.modelQuantityUpdate(e.productId, -e.quantity);
  //   });
  //   const response = await Promise.all(map);
  // if (response[0] !== undefined) {
  //   return { status: status.HTTP_NOT_FOUND, message: 'Such amount is not permitted to sell' };
  // } 
  // const newProduct = await modelSales.modelCreate(saleData);
  // return { status: status.HTTP_OK_STATUS, info: newProduct };
};

module.exports = {
  servicesCreate,
};