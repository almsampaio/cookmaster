module.exports = async (req, res, next) => {
  const role = 'user' in req ? req.user.role : undefined;
  
  if (role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
};