const { recipesService } = require('../services');

exports.create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  recipesService
    .validateToken({ token })
    .then((decoded) => recipesService.create({ name, ingredients, preparation, decoded }))
    .then(({ code, result }) => res.status(code).json({ recipe: result }))
    .catch(({ code, message }) => res.status(code).json({ message }));
};

exports.readMany = async (_req, res) => {
  recipesService
    .readMany()
    .then(({ code, result }) => res.status(code).json(result))
    .catch(({ code, message }) => res.status(code).json({ message }));
};

exports.readOne = async (req, res) => {
  const { id } = req.params;
  recipesService
    .readOne({ id })
    .then(({ code, result }) => res.status(code).json(result))
    .catch(({ code, message }) => res.status(code).json({ message }));
};

exports.update = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization;
  recipesService
    .validateToken({ token })
    .then(() => recipesService.update({ id, name, ingredients, preparation }))
    .then(({ code, result }) => res.status(code).json(result))
    .catch(({ code, message }) => res.status(code).json({ message }));
};
