const serviceUser = require('../services/users');

const create = async (req, res) => {
 const { name, email, password } = req.body;
 const { status, data } = await serviceUser.create(name, email, password);
 res.status(status).json(data);
}; 

const findUser = async (req, res) => {
    const { status, data } = await serviceUser.findUser(req.body);
    res.status(status).json(data);
  };

const creatAdm = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;
  const { status, data } = await serviceUser.createAdm(name, email, password, role);
  res.status(status).json(data);
 }; 

module.exports = {
    create,
    findUser,
    creatAdm, 
};