const { insertOne, takeToken } = require('../services');

const insertRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;    
    const { authorization } = req.headers;
    const payload = takeToken(authorization);   
    const id = '_id';
    const searchObj = {
        userId: payload.data[id],
        name,
        ingredients,
        preparation,
    };
    const newRecipe = await insertOne('recipes', searchObj);    
    return res.status(201).json({ recipe: newRecipe });
};

module.exports = insertRecipe;