const serviceUser = require('../services/users');

const create = async (req, res) => {
 const { name, email, password } = req.body;
 const { status, data } = await serviceUser.create(name, email, password);
 res.status(status).json(data);
}; 

const findUser = async (req, res) => {
    const { email, password } = req.body;
    const { status, data } = await serviceUser.findUser(email, password);
    res.status(status).json(data);
  };

module.exports = {
    create,
    findUser,
};