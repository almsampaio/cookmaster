// const jwt = require('jsonwebtoken');

// const userModel = require('../models/userModels');

// const SECRET = 'meusupersegredo';

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;

//     const { username } = jwt.verify(token, SECRET);

//     const user = await userModel.findByUsername(username);

//     req.user = user;

//     next();
//   } catch (_e) {
//     res.status(401).json({ message: 'Invalid Token' });
//   }
// }; 