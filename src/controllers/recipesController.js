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
