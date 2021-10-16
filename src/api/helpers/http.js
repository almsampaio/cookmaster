const AppError = require('./appError');

const success = (res, data) => res.status(200).json(data);

const created = (res, data) => res.status(201).json(data);

const badRequest = (msg) => {
  throw new AppError(msg);
};

const conflict = (msg) => {
  throw new AppError(msg, 409);
};

const unauthorized = (msg) => {
  throw new AppError(msg, 401);
};

module.exports = { success, created, badRequest, conflict, unauthorized };