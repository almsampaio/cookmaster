const userServices = require('../services/userServices');
const httpStatus = require('../utils/httpStatus');

const getAll = async (_req, res) => {
  const allProducts = await userServices.getAll();
  console.log(allProducts, 'product controller');
  return res.status(httpStatus.HTTP_OK_STATUS).json({ users: allProducts });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userServices.getById(id);

  if (!user) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        },
    });
  }
  return res.status(httpStatus.HTTP_OK_STATUS).json(user);
};

const create = async (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = await userServices.create(name, email, password, role);

  return res.status(httpStatus.HTTP_CREATE_STATUS).json({ user: {
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  } });
};

module.exports = {
  getAll,
  getById,
  create,
};
