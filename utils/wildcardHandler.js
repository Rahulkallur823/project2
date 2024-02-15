// wildcardHandler.js

const wildcardHandler = (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
};

module.exports = wildcardHandler;
