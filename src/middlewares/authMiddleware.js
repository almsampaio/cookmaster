const jwt = require('jsonwebtoken');

const SECRET = 'palavrasecreta';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // const payload = jwt.verify(token, SECRET); // verificação do token que retorna o payload 
    const { id } = jwt.verify(token, SECRET);
    req.userId = id;
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
