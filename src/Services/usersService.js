const usersModel = require('../Models/usersModel');
const userSchema = require('../Models/userSchema');
const { alreadyEmail, invEntries } = require('../helpers');

const validateUsers = async (req, res, next) => {
  console.log(req.body);
  try {
   const { error } = userSchema.validate(req.body);
   console.log(error);
    const { email } = req.body; 
  
    if (error) {
      return res.status(400).json(invEntries);  
    }
    
    const emailValidate = await usersModel.getAllUsersEmail(email);
    if (emailValidate) {
      return res.status(409).json(alreadyEmail);
    }
    next();
  } catch (e) {
    res.status(500).send('Ihhhhh deu erro');
  }
}; 

module.exports = {
  validateUsers,
};