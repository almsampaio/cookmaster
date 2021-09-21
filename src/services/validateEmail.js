const validateEmail = (email) => {
    if (!email) return false;
    if (email.endsWith('.com') && email.includes('@')) return true;
    return false;
};

module.exports = validateEmail;