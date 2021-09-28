const rescue = require('express-rescue');
const userService = require('../services/userService');

const createProduct = rescue(async (req, res, next) => {
    const { name, email, password } = req.body;
    const createdProduct = await userService.create(name, email, password);
    if (!createdProduct.message) {
        return res.status(201).json(createdProduct);
    }
    return next(createdProduct);
});

module.exports = {
    createProduct,
};