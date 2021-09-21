const { getOneUser, getToken } = require('../services');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await getOneUser({ email, password });
    delete user.password;
    delete user.name;
    const token = getToken(user);
    return res.status(200).json({ token });
};

module.exports = loginController;