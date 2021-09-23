const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
//  const userModel = require('../../models/usersModel');

const secret = 'naoconteparaninguem';

module.exports = rescue(async (req, res, next) => {
    const token = req.headers.authorization;
 //   console.log(token);

    if (!token) return res.status(401).json({ message: 'missing auth token' });

    try {
    const decoded = jwt.verify(token, secret);
     
//   const user = await userModel.getLoginByEmail(decoded.padStart.email);
 
    req.payload = decoded.data;

    next();
    } catch (err) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
});