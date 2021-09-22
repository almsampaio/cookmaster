const clientErrors = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
};

const successResponses = {
  ok: 200,
  created: 201,
  noContent: 204,
};

module.exports = { clientErrors, successResponses };