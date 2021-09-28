const jwt = require('jsonwebtoken');

const SECRET = 'xablau2021';

function newToken(user) {
const { password: _, ...payload } = user;
const jwtConfig = {
algorithm: 'HS256',
expiresIn: '1d',
};
const token = jwt.sign(payload, SECRET, jwtConfig);
return { token };
}

module.exports = { newToken };

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const usersModels = require('../models/users');

// const SECRET = 'xablau2021';

// const jwtConfig = {
// expiresIn: '5d',
// algorithm: 'HS256',
// };

// const tokenGenerator = (data) => {
// const userToken = jwt.sign(data, SECRET, jwtConfig);
// return userToken;
// };

// const tokenValidation = async (req, res, next) => {
// const userToken = req.headers.authorization;
// if (!userToken) {
// return res.status(401).json({ message: 'missing auth token' });
// }

// try {
// const payload = jwt.verify(userToken, SECRET);

// const userVerify = await usersModels.searchByEmail(payload.email);
// if (!userVerify || userVerify === undefined) {
//     return res.status(401).json({ message: 'jwt malformed' });
// }

// const { password, ...data } = userVerify;

// req.user = data;

// next();
// } catch (err) {
// return res.status(401).json({ message: err.message });
// }
// };

// module.exports = { tokenGenerator, tokenValidation };