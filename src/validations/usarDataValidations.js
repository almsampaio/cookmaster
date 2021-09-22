const isUserDataValid = (name, password) => {
    if (!name || !password) return false;
    return true;
};

const isUserEmailValid = (email) => {
    if (!email || !email.includes('@') || !email.includes('.com')) return false;
    return true;
};

module.exports = { isUserDataValid, isUserEmailValid };