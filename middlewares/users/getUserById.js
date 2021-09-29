const { ObjectId } = require('mongodb');
const usersServices = require('../../services/usersServices');

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) throw new Error('user not found');
    const user = await usersServices.getById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getUserById };