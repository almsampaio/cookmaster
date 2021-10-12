const usersList = (req, res) => {
  const { name, password } = req.body;
  res.status(200).json({ name, password });
};

module.exports = {
  usersList,
};