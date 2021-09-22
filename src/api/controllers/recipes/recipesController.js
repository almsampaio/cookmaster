const {
  HTTP_NOT_FOUND,
  HTTP_UNAUTHORIZED,
  HTTP_CREATED,
  HTTP_OK_STATUS,
  HTTP_NO_CONTENT,
} = require('../../schemas/status');

const {
  createServices,
  readAllServices,
  readByIdServices,
  updateServices,
  deleteServices,
} = require('../../services/recipes/recipesService');

const createController = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.userRecipes;

  const { data } = await createServices(name, ingredients, preparation, userId);

  return res.status(HTTP_CREATED).json({
    recipe: data,
  });
};

const readAllController = async (_req, res) => {
  const { data } = await readAllServices();

  return res.status(HTTP_OK_STATUS).json(data);
};

const readByIdController = async (req, res) => {
  const { id } = req.params;
  const { message, data } = await readByIdServices(id);

  if (!data) {
    return res.status(HTTP_NOT_FOUND).json({ message });
  }

  return res.status(HTTP_OK_STATUS).json(data);
};

const updateController = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId, role } = req.userRecipes;

  const updatedData = { id, name, ingredients, preparation };
  const { message, data } = await updateServices(id, userId, role, updatedData);

  if (!data) {
    return res.status(HTTP_UNAUTHORIZED).json({ message });
  }
  
  return res.status(HTTP_OK_STATUS).json(data);
};

const deleteController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.userRecipes;
  // console.log(userId);
  const { isEmpty, deleted, notEqual, message } = await deleteServices(id, userId, role);

  if (isEmpty) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'recipe not found' });
  }

  if (deleted) {
    return res.status(HTTP_NO_CONTENT).json();
  }

  if (notEqual) {
    return res.status(HTTP_UNAUTHORIZED).json({ message });
  }
};

module.exports = {
  createController,
  readAllController,
  readByIdController,
  updateController,
  deleteController,
};