const error = (err, _req, res, _next) => {
    const errorStatusService = 500;
  
    const status = err.code || errorStatusService;
  
    res.status(status).json({ message: err.message });
  };
  
  module.exports = error;
