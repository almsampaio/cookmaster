const validateValue = (value) => {
    if (!value) {
      return false;
    }
  
    return value;
  };
  
  const validateEmail = (email) => {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/;
  
    if (!email) return false;
  
    if (!regexEmail.test(email)) {
      return false;
    }
  
    return email;
  };
  
  const validatesUsers = (req, _res, next) => {
    const { name, email, password } = req.body;
  
    const isValidName = validateValue(name);
    const isValidEmail = validateEmail(email);
    const isValidPassword = validateValue(password);
  
    if (!isValidName || !isValidEmail || !isValidPassword) {
      return next({ code: 400, message: 'Invalid entries. Try again.' });
    }
  
    return next();
  };

  const validateLogin = (req, _res, next) => {
    const { email, password } = req.body;
  
    const isValidEmail = validateValue(email);
    const isValidPassword = validateValue(password);
  
    if (!isValidEmail || !isValidPassword) {
      return next({ code: 401, message: 'All fields must be filled' });
    }
  
    return next();
  };

  const validateRecipes = (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
  
    const isValidName = validateValue(name);
    const isValidIngredients = validateValue(ingredients);
    const isValidPreparation = validateValue(preparation);
  
    if (!isValidName || !isValidIngredients || !isValidPreparation) {
      return next({ code: 400, message: 'Invalid entries. Try again.' });
    }
  
    return next();
  };

  const validateId = (req, _res, next) => {
    const { id } = req.params;
    const regexId = /[0-9A-Fa-f]{6}/g;
  
    if (!regexId.test(id)) {
      return next({ code: 404, message: 'recipe not found' });
    }
  
    return next();
  };
  
  const validadteAdmin = (req, _res, next) => {
    const { role } = req.user;
  
    if (role !== 'admin') {
      return next({ code: 403, message: 'Only admins can register new admins' });
    }
  
    return next();
  };
  module.exports = {
    validatesUsers,
    validateLogin,
    validateRecipes,
    validateId,
    validadteAdmin,
 };
