const Validator = require('validatorjs');

const validateRegisterClient = (req, res, next) => {
  const rules = {
    name: 'required|string|min:3',
    email: 'required|email',
    telephone: 'required|numeric|digits_between:8,15',
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.status(400).json({ errors: validation.errors.all() });
  }

  next();
};

const validateUpdateClient = (req, res, next) => {
  const rules = {
    name: 'string|min:3',
    email: 'email',
    telephone: 'numeric|digits_between:8,15',
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.status(400).json({ errors: validation.errors.all() });
  }

  next();
};

module.exports = {
  validateRegisterClient,
  validateUpdateClient,
};
