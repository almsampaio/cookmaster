const validateEmail = (email) => {
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    if (regex.test(email)) return true;
    return false;
};

module.exports = {
    validateEmail,

};
