const success = (res, data) => res.status(200).json(data);

const created = (res, data) => res.status(201).json(data);

module.exports = { success, created };