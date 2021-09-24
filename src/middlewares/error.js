const errorMiddleware = (error, _request, response, _next) => {
  const { message, status } = error;

  response.status(status).json({ message });
};

module.exports = errorMiddleware;
