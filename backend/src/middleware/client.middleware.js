const Validator = require('validatorjs');

const isValidCoordinate = (coordinate, min, max) => coordinate >= min && coordinate <= max;

const validateCoordinates = (req, errors) => {
  if (!isValidCoordinate(req.body.y_coordinate, -90, 90)) {
    errors.y_coordinate = ['The y_coordinate needs to be between -90 and 90.'];
  }
  if (!isValidCoordinate(req.body.x_coordinate, -180, 180)) {
    errors.x_coordinate = ['The x_coordinate needs to be between -180 and 180.'];
  }
};

const validateClient = (req, res, next, rules) => {
  const validation = new Validator(req.body, rules);

  const errors = {};
  if (validation.fails()) {
    errors.validation = validation.errors.all();
  }
  validateCoordinates(req, errors);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateRegisterClient = (req, res, next) => {
  const rules = {
    name: 'required|string|min:3',
    email: 'required|email',
    telephone: 'required|numeric|digits_between:8,15',
    y_coordinate: 'required|numeric',
    x_coordinate: 'required|numeric',
  };
  validateClient(req, res, next, rules);
};

const validateUpdateClient = (req, res, next) => {
  const rules = {
    name: 'string|min:3',
    email: 'email',
    telephone: 'numeric|digits_between:8,15',
    y_coordinate: 'numeric',
    x_coordinate: 'numeric',
  };
  validateClient(req, res, next, rules);
};

module.exports = {
  validateRegisterClient,
  validateUpdateClient,
};
