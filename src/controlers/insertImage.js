const { updateById, getById } = require('../services');

const insertImage = async (req, res) => {    
    const { id } = req.params;
    const image = `localhost:3000/src/uploads/${id}.jpeg`;
    await updateById('recipes', id, { image });
    const recipe = await getById('recipes', id);
    return res.status(200).json(recipe);
};

module.exports = insertImage;