module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) return res.status(401).json({ message: 'missing auth token' });

  next();
};