const ping = (_req, res) => res.status(200).json('pong');

module.exports = { ping };
