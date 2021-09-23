const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND = 404;
const HTTP_FORBIDDEN_STATUS = 403;
const HTTP_CONFLICT_STATUS = 409;

const ENTRIES_ERROR = 'Invalid entries. Try again.';
const EMAIL_CONFLICT_ERROR = 'Email already registered';
const LOGIN_INCORRECT_ERROR = 'Incorrect username or password';
const ADMIN_ERROR = 'Only admins can register new admins';
const NOT_YOUR_RECIPE_ERROR = 'You can only modify your own recipes';
const MUST_FILLED = 'All fields must be filled';
const MSG_JWT_MALFORMED = 'jwt malformed';
const MSG_NOT_FOUND_RECIPE = 'recipe not found';
const MSG_MISSING_TOKEN = 'missing auth token';

const REQUEST_INVALID_ENTRIES = {
  status: HTTP_BAD_REQUEST_STATUS,
  err: { message: ENTRIES_ERROR },
};

const EMAIL_CONFLICT = {
  status: HTTP_CONFLICT_STATUS,
  err: { message: EMAIL_CONFLICT_ERROR },
};

const UNAUTHORIZED_EMPTY_FIELDS = {
  status: HTTP_UNAUTHORIZED_STATUS,
  err: { message: MUST_FILLED },
};

const UNAUTHORIZED_INVALID_DATA = {
  status: HTTP_UNAUTHORIZED_STATUS,
  err: { message: LOGIN_INCORRECT_ERROR },
};

const NOT_FOUND_RECIPE = {
  status: HTTP_NOT_FOUND,
  err: {
    message: MSG_NOT_FOUND_RECIPE,
  },
};

const JWT_MALFORMED = {
  status: HTTP_UNAUTHORIZED_STATUS,
  err: {
    message: MSG_JWT_MALFORMED,
  },
};

const ERROR_MISSING_TOKEN = {
  status: HTTP_UNAUTHORIZED_STATUS,
  err: {
    message: MSG_MISSING_TOKEN,
  },
};

module.exports = {
  HTTP_OK_STATUS,
  CREATED_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
  HTTP_FORBIDDEN_STATUS,
  HTTP_CONFLICT_STATUS,
  ENTRIES_ERROR,
  EMAIL_CONFLICT_ERROR,
  LOGIN_INCORRECT_ERROR,
  ADMIN_ERROR,
  NOT_YOUR_RECIPE_ERROR,
  REQUEST_INVALID_ENTRIES,
  EMAIL_CONFLICT,
  UNAUTHORIZED_EMPTY_FIELDS,
  UNAUTHORIZED_INVALID_DATA,
  NOT_FOUND_RECIPE,
  JWT_MALFORMED,
  ERROR_MISSING_TOKEN,
};
